import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from './product.entity';
import { Expose } from 'class-transformer';

@Index("idx_product_images_deleted_at", ["deletedAt"], {})
@Index("product_images_pkey", ["id"], { unique: true })
@Index("idx_product_images_product_id", ["productId"], {})
@Entity() export class ProductImage {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Expose()
  @Column("integer", { name: "product_id", nullable: true })
  productId: number | null;

  @Expose()
  @Column("character varying", { name: "image_url", length: 255 })
  imageUrl: string;

  @Expose()
  @Column("boolean", {
    name: "is_primary",
    nullable: true,
    default: () => "false",
  })
  isPrimary: boolean | null;

  @Expose()
  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Expose()
  @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Product, (product) => product.productImages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;
}
