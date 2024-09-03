import { Column, Entity, Index, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import { UserProfile } from "@/entities/user-profile.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Expose()
  @Column("character varying", { name: "username", unique: true, length: 200 })
  username: string;

  @Expose()
  @Column("character varying", { name: "email", unique: true, length: 200 })
  email: string;
  @Expose()
  @Column("character varying", { name: "password", length: 200 })
  password: string;

  @Expose()
  @Column("character varying", { name: "provider", length: 25 })
  provider: string;

  @Expose()
  @Column("character varying", { name: "provider_id", length: 255 })
  providerId: string;
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

  @Expose()
  @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
  deleteAt: Date | null;

  @OneToOne(() => UserProfile, (profile)=> profile.user)
  profile: UserProfile;
}
