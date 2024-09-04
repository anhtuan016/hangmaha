import { Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("health-check")
export class HealthCheckController {
  @Get()
  pingGet(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({ status: 200, msg: "ok" });
  }

  @Post()
  pingPost(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({ status: 200, msg: "ok" });
  }
}
