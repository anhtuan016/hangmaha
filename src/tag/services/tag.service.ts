import { Tag } from "@/entities/tag.entity";
import { CreateTagDto } from "@/tag/dtos/tag.dto";
import { TagRepository } from "@/tag/repositories/tag.repository";
import { ApiResponse, ApiResponseWithPaging } from "@/types/api-response";
import { ResponseFactory } from "@/utils/response-factory";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TagService {
  constructor(private readonly repository: TagRepository) {}
  async getById(id: number): Promise<ApiResponse<Tag>> {
    const product = await this.repository.getById(id);
    return ResponseFactory.success(product);
  }

  async findAll(page = 1, pageSize = 10): Promise<ApiResponseWithPaging<Tag[]>> {
    const [data, totalCount] = await this.repository.findAll(page, pageSize);
    return ResponseFactory.withPaging(data, { page, pageSize, totalItems: totalCount });
  }

  async create(dto: CreateTagDto): Promise<ApiResponse<Tag>> {
    const newObj = await this.repository.create(dto);
    return ResponseFactory.success(newObj, null);
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    await this.repository.delete(id);
    return ResponseFactory.success();
  }
}
