import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./Categories";
import { ProductImages } from "./ProductImages";
import { ProductTags } from "./ProductTags";

@Index("products_pkey", ["id"], { unique: true })
@Entity("products", { schema: "public" })
export class Products {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("numeric", { name: "price", precision: 10, scale: 2 })
  price: string;

  @Column("integer", { name: "stock_quantity" })
  stockQuantity: number;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp with time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToMany(() => Categories, (categories) => categories.products)
  categories: Categories[];

  @OneToMany(() => ProductImages, (productImages) => productImages.product)
  productImages: ProductImages[];

  @OneToMany(() => ProductTags, (productTags) => productTags.product)
  productTags: ProductTags[];
}
