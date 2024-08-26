import { Product } from "@/entities/product.entity";
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
  @Expose()
  products?: Product[];
}
export class CreateCategoryDto {
  @Expose()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  products?: Product[];
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
