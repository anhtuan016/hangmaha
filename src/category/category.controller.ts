import { Controller, Get, Query } from "@nestjs/common";
import { CategoryService } from "./services/category.service";
import { ApiResponseWithPaging } from "../types/api-response";
import { Category } from "../entities/category.entity";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get("")
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10
  ): Promise<ApiResponseWithPaging<Category[]>> {
    return this.categoryService.findAll(page, limit);
  }
}
