import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";

import { Component } from "./component.entity";

@Entity("componentDetails")
export class ComponentDetails {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({example: "333a1c84-d7ab-11ea-87d0-0242ac130003", description: "Component details uuid"})
  id: string;

  @Column({ default: "" })
  @ApiProperty({ example: "Some features", description: "Features of the component" })
  features: string;

  @Column({ default: "" })
  @ApiProperty({ example: "Some future features", description: "Future features of the component" })
  futureFeatures: string;

  @Column({ default: "" })
  @ApiProperty({ example: "Some notes", description: "Notes of the component" })
  notes: string;

  @Column({ default: "" })
  @ApiProperty({ example: "Some requirements", description: "Requirements of the component" })
  requirements: string;

  @Column()
  @ApiProperty({ example: 1, description: "The version of component details" })
  version: number;

  @CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The creation time of the component details" })
  createdAt: number;

  @ManyToOne(type => Component, component => component.details, { onDelete: "CASCADE" })
  @ApiProperty({ description: "Component" })
  component: Component;
}
