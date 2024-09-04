import { AuthService } from "@/auth/services/auth.service";
import { JwtAuthGuard } from "@/auth/strategies/jwt-auth.guard";
import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() payload: { username: string; password: string }, @Req() req: Request) {
    const user = await this.authService.validateUser(payload.username, payload.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user, req.headers["user-agent"]);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    const user = req.user;
    await this.authService.logout(user.userId, req.headers["user-agent"]);
  }

  @Post("logout-all")
  @UseGuards(JwtAuthGuard)
  async logoutAll(@Req() req: Request) {
    const user = req.user;
    await this.authService.globalLogout(user.userId);
  }
}
