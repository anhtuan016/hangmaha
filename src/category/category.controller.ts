import { Controller, Get, Query } from "@nestjs/common";
import { CategoryService } from "./services/category.service";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get("")
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.categoryService.findAll(page, limit);
  }
}
