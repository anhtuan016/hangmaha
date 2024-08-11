import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { ProductImages } from "./product-image.entity";
import { Tags } from "./tag.entity";
import { Expose } from "class-transformer";

@Index("products_pkey", ["id"], { unique: true })
@Entity("products", { schema: "public" })
export class Products {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  @Expose()
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  @Expose()
  name: string;

  @Column("text", { name: "description", nullable: true })
  @Expose()
  description: string | null;

  @Column("numeric", { name: "price", precision: 10, scale: 2 })
  @Expose()
  price: string;

  @Column("integer", { name: "stock_quantity" })
  @Expose()
  stockQuantity: number;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  @Expose()
  createdAt: Date | null;

  @Column("timestamp with time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  @Expose()
  updatedAt: Date | null;

  @ManyToMany(() => Category, (categories) => categories.products)
  @Expose()
  categories: Category[];

  @OneToMany(() => ProductImages, (productImages) => productImages.product)
  @Expose()
  productImages: ProductImages[];

  @ManyToMany(() => Tags, (tags) => tags.products)
  @JoinTable({
    name: "product_tags",
    joinColumns: [{ name: "product_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "tag_id", referencedColumnName: "id" }],
    schema: "public",
  })
  @Expose()
  tags: Tags[];
}