import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";
import { CategoryDto } from "@/category/dtos/category.dto";

export class ProductDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description?: string | null;
  @Expose()
  price: string;
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
