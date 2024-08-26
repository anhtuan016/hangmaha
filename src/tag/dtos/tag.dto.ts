import { Expose } from "class-transformer";
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { ProductDto } from "@/product/dtos/product.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class TagDto {
  @Expose()
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
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
