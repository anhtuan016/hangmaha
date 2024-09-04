import { getTokenRedisKey } from "@/redis/redis.util";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private readonly redisClient: Redis;
  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>("REDIS_HOST");
    const port = this.configService.get<number>("REDIS_PORT");
    this.redisClient = new Redis({
      host,
      port,
    });
  }

  async storeToken(userId: number, token: string, ttl: number, deviceInfo: string = "NOT_YET_IMPLEMENTED") {
    try {
      await this.redisClient.set(getTokenRedisKey(userId, deviceInfo), token, "EX", ttl);
    } catch (err) {
      this.logger.error(`Error storing token for user ${userId} on device ${deviceInfo}: ${err.message}`);
      throw new Error("Could not store token");
    }
  }

  async retrieveToken(userId: number, deviceInfo: string) {
    try {
      return await this.redisClient.get(getTokenRedisKey(userId, deviceInfo));
    } catch (err) {
      this.logger.error(`Error checking token validity for user ${userId} on device ${deviceInfo}: ${err.message}`);
      throw new Error("Could not validate token");
    }
  }

  async revokeToken(userId: number, deviceInfo: string): Promise<void> {
    try {
      await this.redisClient.del(`token:${userId}:${deviceInfo}`);
    } catch (error) {
      this.logger.error(`Error revoking token for user ${userId} on device ${deviceInfo}: ${error.message}`);
      throw new Error("Could not revoke token");
    }
  }

  async revokeAllTokens(userId: number): Promise<void> {
    try {
      const keys = await this.redisClient.keys(`token:${userId}:*`);
      if (keys.length > 0) {
        const pipeline = this.redisClient.pipeline();
        keys.forEach((key) => pipeline.del(key));
        await pipeline.exec();
      }
    } catch (error) {
      this.logger.error(`Error revoking all tokens for user ${userId}: ${error.message}`);
      throw new Error("Could not revoke all tokens");
    }
  }
}
