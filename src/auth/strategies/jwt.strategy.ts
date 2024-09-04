import { AuthService } from "@/auth/services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload) {
    const tokenValid = await this.authService.retrieveToken(payload.sub, payload.deviceInfo);
    if (!tokenValid) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.username, email: payload.email, deviceInfo: payload.deviceInfo };
  }
}
