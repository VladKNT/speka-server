import { ApiProperty } from "@nestjs/swagger";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: "333a1c84-d7ab-11ea-87d0-0242ac130003", description: "User Details uuid" })
  id: string;

  @Column()
  @ApiProperty({ example: "John", description: "User's first name" })
  firstName: string;

  @Column()
  @ApiProperty({ example: "Doe", description: "User's last name" })
  lastName: string;

  @Column()
  @ApiProperty({ example: "https:://user-avatar.com/32rwfsvsaz", description: "User's avatar Url" })
  avatarUrl: string;

  @CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The creation time of the user details" })
  createdAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The update time of the user details" })
  updatedAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true })
  @ApiProperty({ example: 1596696377370, description: "The deletion time  of the user details" })
  deletedAt: number;
}
