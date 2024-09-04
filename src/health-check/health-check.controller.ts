import { Controller, Get, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";

@Controller("health-check")
export class HealthCheckController {
  private readonly logger = new Logger(HealthCheckController.name);
  @Get()
  @HttpCode(HttpStatus.OK)
  pingGet() {
    this.logger.log("HEALTH OK");
    return { status: 200, msg: "ok" };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  pingPost() {
    this.logger.log("HEALTH OK");
    return { status: 200, msg: "ok" };
  }
}
