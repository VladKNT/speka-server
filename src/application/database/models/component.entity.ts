import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Project } from "./project.entity";

enum EStatus {
  PLANNING = "Planning",
  IN_PROGRESS = "In progress",
  READY_FOR_TESTING = "Ready for testing",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

@Entity()
export class Component {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({example: "333a1c84-d7ab-11ea-87d0-0242ac130003", description: "The uuid of the component"})
  id: string;

  @Column({ length: 128 })
  @ApiProperty({ example: "Cooler", description: "The name of the component" })
  name: string;

  @Column()
  @ApiProperty({ example: "Description", description: "Description of the component" })
  description: string;

  @Column()
  @ApiProperty({ example: 1000, description: "Spent time on the component (in minutes)" })
  spentTime: number;

  @Column()
  @ApiProperty({ example: 80, description: "Spent time on the component (in minutes)" })
  estimatedTime: number;

  @Column({ type: "enum", enum: EStatus, default: EStatus.PLANNING })
  @ApiProperty({ example: "Planning", description: "The current state of the component" })
  phase: EStatus;

  @CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The creation time of the component" })
  createdAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The update time of the component" })
  updatedAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true })
  @ApiProperty({ example: 1596696377370, description: "The deletion time  of the component" })
  deletedAt: number;

  @ManyToOne(type => Project, project => project.components, {
    onDelete: "CASCADE"
  })
  @ApiProperty({ description: "The project of the component" })
  project: Project;
}
