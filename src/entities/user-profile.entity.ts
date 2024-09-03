import { Column, Entity, Index, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import { User } from "@/entities/user.entity";

@Entity("user_profiles")
export class UserProfile {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Expose()
  @Column("character varying", { name: "display_name", length: 200 })
  displayName: string;

  @Expose()
  @Column("text", { name: "avatar_url" })
  avatarUrl: string;

  @Expose()
  @Column("text", { name: "bio" })
  bio: string;

  @Expose()
  @Column("character varying", { name: "status", length: 20 })
  status: string;

  @Expose()
  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Expose()
  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
