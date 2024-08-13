import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from './product.entity';
import { Expose } from 'class-transformer';

@Index("idx_tags_deleted_at", ["deletedAt"], {})
@Index("tags_pkey", ["id"], { unique: true })
@Index("tags_name_key", ["name"], { unique: true })
@Entity() export class Tag {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Expose()
  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

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

  @ManyToMany(() => Product, (products) => products.tags)
  products: Product[];
}
