import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { ProductRepository } from "./repositories/product.repository";
import { ProductController } from "./product.controller";
import { ProductService } from "./services/product.service";
import { CategoryModule } from "@/category/category.module";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
