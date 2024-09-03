import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/services/auth.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AuthController],
  providers: [AuthService, ],
  exports: [],
})
export class AuthModule {}
