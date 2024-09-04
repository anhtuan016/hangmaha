import { AuthRepository } from "@/auth/repositories/auth.repository";
import { User } from "@/entities/user.entity";
import { RedisService } from "@/redis/redis.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService, // TODO: change the type
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const userExist = await this.authRepository.getUserByUsername(username);
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (isPasswordValid) return userExist;
    return null;
  }

  async login(user: User, deviceInfo: string) {
    const payload = { sub: user.id, username: user.username, deviceInfo };
    const token = this.jwtService.sign(payload);
    await this.redisService.storeToken(user.id, token, this.configService.get("JWT_EXPIRED"));
    return {
      access_token: token,
    };
  }

  async retrieveToken(userId: number, deviceInfo: string) {
    const token = await this.redisService.retrieveToken(userId, deviceInfo);
    return token;
  }

  async logout(userId: number, deviceInfo: string) {
    await this.redisService.revokeToken(userId, deviceInfo);
  }

  async globalLogout(userId: number) {
    await this.redisService.revokeAllTokens(userId);
  }
}
