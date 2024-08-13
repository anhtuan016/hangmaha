import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CategoryService } from "@/category/services/category.service";
import { ApiResponse, ApiResponseWithPaging } from "@/types/api-response";
import { Category } from "@/entities/category.entity";
import { CreateCategoryDto, UpdateCategoryDto } from "@/category/dto/category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get("")
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10): Promise<ApiResponseWithPaging<Category[]>> {
    return this.categoryService.findAll(page, limit);
  }

  @Post("new")
  async create(@Body() dto: CreateCategoryDto): Promise<ApiResponse<Category>> {
    return this.categoryService.create(dto);
  }

  @Patch("update")
  async update(@Body() dto: UpdateCategoryDto): Promise<ApiResponse<Category>> {
    return this.categoryService.update(dto);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: number): Promise<ApiResponse<null>> {
    return await this.categoryService.delete(id);
  }
}
