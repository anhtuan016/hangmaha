import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "firstName" })
  firstName: string;

  @Column("character varying", { name: "lastName" })
  lastName: string;

  @Column("boolean", { name: "isActive", default: () => "true" })
  isActive: boolean;
}
