import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { ProductRepository } from "./repositories/product.repository";
import { ProductController } from "./product.controller";
import { ProductService } from "./services/product.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
