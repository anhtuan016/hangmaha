import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/services/auth.service";
import { JwtStrategy } from "@/auth/strategies/jwt.strategy";
import { UserProfile } from "@/entities/user-profile.entity";
import { User } from "@/entities/user.entity";
import { RedisService } from "@/redis/redis.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRED },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RedisService],
  exports: [],
})
export class AuthModule {}
