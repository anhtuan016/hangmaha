import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";
import { Expose } from "class-transformer";

@Index("categories_pkey", ["id"], { unique: true })
@Entity("categories", { schema: "public" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  @Expose()
  id: number;

  @Column("character varying", { name: "name", length: 100 })
  @Expose()
  name: string;

  @Column("text", { name: "description", nullable: true })
  @Expose()
  description: string | null;

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

  @ManyToMany(() => Products, (products) => products.categories)
  @JoinTable({
    name: "product_categories",
    joinColumns: [{ name: "category_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "product_id", referencedColumnName: "id" }],
    schema: "public",
  })
  @Expose()
  products: Products[];
}