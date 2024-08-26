import { Module } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { TagService } from "./services/tag.service";
import { TagRepository } from "@/tag/repositories/tag.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "@/entities/tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService, TagRepository],
  exports: [TagService, TagRepository],
})
export class TagModule {}
