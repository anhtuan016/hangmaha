import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";

@Index("product_images_pkey", ["id"], { unique: true })
@Index("idx_product_images_product_id", ["productId"], {})
@Entity("product_images", { schema: "public" })
export class ProductImages {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "product_id", nullable: true })
  productId: number | null;

  @Column("character varying", { name: "image_url", length: 255 })
  imageUrl: string;

  @Column("boolean", {
    name: "is_primary",
    nullable: true,
    default: () => "false",
  })
  isPrimary: boolean | null;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Products, (products) => products.productImages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Products;
}
