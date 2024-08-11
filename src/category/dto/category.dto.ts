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
