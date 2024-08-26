import { Tag } from "@/entities/tag.entity";
import { CreateTagDto } from "@/tag/dtos/tag.dto";
import { TagService } from "@/tag/services/tag.service";
import { ApiResponse, ApiResponseWithPaging } from "@/types/api-response";
import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";

@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get("")
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10): Promise<ApiResponseWithPaging<Tag[]>> {
    return this.tagService.findAll(page, limit);
  }

  @Post("new")
  async create(@Body() dto: CreateTagDto): Promise<ApiResponse<Tag>> {
    return this.tagService.create(dto);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: number): Promise<ApiResponse<null>> {
    return await this.tagService.delete(id);
  }
}
