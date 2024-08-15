import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiResponse, ApiResponseWithPaging } from "@/types/api-response";
import { Product } from "../entities/product.entity";
import { ProductService } from "./services/product.service";
import { CreateProductDto, UpdateProductDto } from "./dtos/product.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get("")
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10): Promise<ApiResponseWithPaging<Product[]>> {
    return this.productService.findAll(page, limit);
  }

  @Post("new")
  async create(@Body() dto: CreateProductDto): Promise<ApiResponse<Product>> {
    return this.productService.create(dto);
  }

  @Patch("update")
  async update(@Body() dto: UpdateProductDto): Promise<ApiResponse<Product>> {
    return this.productService.update(dto);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: number): Promise<ApiResponse<null>> {
    return await this.productService.delete(id);
  }
}
