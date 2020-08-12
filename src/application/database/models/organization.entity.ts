import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: "333a1c84-d7ab-11ea-87d0-0242ac130003", description: "The uuid of the organization" })
  id: string;

  @Column({ length: 128 })
  @ApiProperty({ example: "Speka", description: "The name of the organization" })
  name: string;

  @Column()
  @ApiProperty({ example: "speka@speka.com", description: "The email of the organization" })
  email: string;

  @Column()
  @ApiProperty({ example: "+380 00 00 0000", description: "The email of the organization" })
  contactNumber: string;

  @Column({ nullable: true })
  @ApiProperty({ example: "https://s3/images/logo.png", description: "The logo url of the organization" })
  logoUrl: string;

  @CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The creation time of the organization" })
  createdAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The update time of the organization" })
  updatedAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true })
  @ApiProperty({ example: 1596696377370, description: "The deletion time  of the organization" })
  deletedAt: number;
}
