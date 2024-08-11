import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "../repo/category.repository";
import { ApiResponseWithPaging } from "../../types/api-response";
import { Category } from "../../entities/category.entity";
import { ResponseFactory } from "../../utils/response-factory";

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}
  async findAll(
    page = 1,
    pageSize = 10
  ): Promise<ApiResponseWithPaging<Category[]>> {
    const [data, totalCount] = await this.repository.findAll(page, pageSize);
    return ResponseFactory.withPaging(data, page, pageSize, totalCount);
  }
}
