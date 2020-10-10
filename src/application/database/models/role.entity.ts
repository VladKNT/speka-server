import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { User } from "./user.entity";

enum ERoles {
  ADMIN= "Admin",
  ASSISTANT = "Assistant",
  PROJECT_MANAGER = "Project Manager",
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: "333a1c84-d7ab-11ea-87d0-0242ac130003", description: "Role uuid" })
  id: string;

  @Column({ type: "enum", enum: ERoles, default: ERoles.ASSISTANT })
  @ApiProperty({ example: "Admin", description: "Role name" })
  name: ERoles;

  @OneToMany(type => User, user => user.role)
  users: User[];
}
