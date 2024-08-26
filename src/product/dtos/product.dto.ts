import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";
import { CategoryDto } from "@/category/dtos/category.dto";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
  @Expose()
  id: number;
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Expose()
  qrCode?: string;
  @Expose()
  barCode?: string;
  @Expose()
  @IsString()
  @IsOptional()
  description?: string | null;
  @Expose()
  @IsNumber()
  @IsOptional()
  price: number;
  @Expose()
  createdAt?: Date | null;
  @Expose()
  updatedAt?: Date | null;
  @Expose()
  deletedAt?: Date | null;

  @Expose()
  categories?: CategoryDto[];

  @Expose()
  productImages?: any[]; // TODO

  @Expose()
  tags?: any[]; // TODO

}

export class CreateProductDto extends OmitType(ProductDto, ["createdAt", "updatedAt"] as const) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
