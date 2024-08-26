import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';
import { Tag } from './tag.entity';
import { Expose } from 'class-transformer';

@Index("idx_products_deleted_at", ["deletedAt"], {})
@Index("products_pkey", ["id"], { unique: true })
@Entity() export class Product {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Expose()
  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Expose()
  @Column("character varying", { name: "qrCode", length: 255 })
  qrCode: string;

  @Expose()
  @Column("character varying", { name: "barCode", length: 255 })
  barCode: string;

  @Expose()
  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Expose()
  @Column("text", { name: "html", nullable: true })
  html: string | null;

  @Expose()
  @Column("numeric", { name: "price", precision: 10, scale: 2 })
  price: number;

  @Expose()
  @Column("integer", { name: "stock_quantity" })
  stockQuantity: number;

  @Expose()
  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Expose()
  @Column("timestamp with time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Expose()
  @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @ManyToMany(() => Tag, (tag) => tag.products)
  @JoinTable({
    name: "products_x_tags",
    joinColumns: [{ name: "product_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "tag_id", referencedColumnName: "id" }],
    schema: "public",
  })
  tags: Tag[];
}
