import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from './product.entity';
import { Expose } from 'class-transformer';

@Index("idx_categories_deleted_at", ["deletedAt"], {})
@Index("categories_pkey", ["id"], { unique: true })
@Entity("categories", { schema: "public" })
export class Category {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Expose()
  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Expose()
  @Column("text", { name: "description", nullable: true })
  description: string | null;

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

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable({
    name: "products_x_categories",
    joinColumns: [{ name: "category_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "product_id", referencedColumnName: "id" }],
    schema: "public",
  })
  products: Product[];
}
