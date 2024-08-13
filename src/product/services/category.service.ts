import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository } from "@/category/repo/category.repository";
import { ApiResponse, ApiResponseWithPaging } from "@/types/api-response";
import { Category } from "@/entities/category.entity";
import { ResponseFactory } from "@/utils/response-factory";
import { CreateCategoryDto, UpdateCategoryDto } from "@/category/dto/category.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async getById(id: number): Promise<ApiResponse<Category>> {
    const category = await this.repository.getById(id);
    return ResponseFactory.success(category);
  }

  async findAll(page = 1, pageSize = 10): Promise<ApiResponseWithPaging<Category[]>> {
    const [data, totalCount] = await this.repository.findAll(page, pageSize);
    return ResponseFactory.withPaging(data, page, pageSize, totalCount);
  }

  async create(dto: CreateCategoryDto): Promise<ApiResponse<Category>> {
    const newObj = await this.repository.create(dto);
    return ResponseFactory.success(newObj, null);
  }

  async update(dto: UpdateCategoryDto): Promise<ApiResponse<Category>> {
    const exists = await this.repository.getById(dto.id);
    const updatedObj = await this.repository.update(dto, exists.id);
    return ResponseFactory.success(updatedObj, null);
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    await this.repository.delete(id);
    return ResponseFactory.success();
  }
}
