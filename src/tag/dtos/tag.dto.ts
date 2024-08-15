import { Expose } from "class-transformer";
import { ProductDto } from "../../product/dtos/product.dto";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class TagDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  products?: ProductDto[];

  @Expose()
  createdAt?: Date | null;

  @Expose()
  deletedAt?: Date | null;
}

export class CreateTagDto extends OmitType(TagDto, ["products", "createdAt", "deletedAt"] as const) {}
export class UpdateTagDto extends PartialType(CreateTagDto) {}
