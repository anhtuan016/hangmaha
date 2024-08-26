import { Injectable } from "@nestjs/common";
import { ApiResponse, ApiResponseWithPaging } from "@/types/api-response";
import { ResponseFactory } from "@/utils/response-factory";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../../entities/product.entity";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async getById(id: number): Promise<ApiResponse<Product>> {
    const product = await this.repository.getById(id);
    return ResponseFactory.success(product);
  }

  async findAll(page = 1, pageSize = 10): Promise<ApiResponseWithPaging<Product[]>> {
    const [data, totalCount] = await this.repository.findAll(page, pageSize);
    return ResponseFactory.withPaging(data,{ page, pageSize,totalItems: totalCount});
  }

  async create(dto: CreateProductDto): Promise<ApiResponse<Product>> {
    const newObj = await this.repository.create(dto);
    return ResponseFactory.success(newObj, null);
  }

  async update(dto: UpdateProductDto): Promise<ApiResponse<Product>> {
    const exists = await this.repository.getById(dto.id);
    const updatedObj = await this.repository.update(dto, exists.id);
    return ResponseFactory.success(updatedObj, null);
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    await this.repository.delete(id);
    return ResponseFactory.success();
  }
}
