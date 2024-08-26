import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./services/category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryRepository } from "@/category/repositories/category.repository";
import { Category } from "@/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
