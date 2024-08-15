import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";

export class CategoryDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description: string | null;
  @Expose()
  createdAt: Date | null;
  @Expose()
  updatedAt: Date | null;
  //   @Expose()
  //   products: Products[];
}

export class CreateCategoryDto extends OmitType(CategoryDto, ["createdAt", "updatedAt"] as const) {}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
