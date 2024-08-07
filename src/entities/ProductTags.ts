import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";

@Index("product_tags_pkey", ["id"], { unique: true })
@Index("idx_product_tags_product_id", ["productId"], {})
@Index("idx_product_tags_tag", ["tag"], {})
@Entity("product_tags", { schema: "public" })
export class ProductTags {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "product_id", nullable: true })
  productId: number | null;

  @Column("character varying", { name: "tag", length: 50 })
  tag: string;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Products, (products) => products.productTags, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Products;
}
