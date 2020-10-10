import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";

import { Organization } from "./organization.entity";
import {User} from "./user.entity";

enum EPhase {
  INITIAL = "Initial",
  CLOSING = "Closing",
  PLANNING = "Planning",
  IMPLEMENTATION = "Implementation",
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: "333a1c84-d7ab-11ea-87d0-0242ac130003", description: "The uuid of the project" })
  id: string;

  @Column({ length: 128 })
  @ApiProperty({ example: "Cooler", description: "The name of the project" })
  name: string;

  @Column()
  @ApiProperty({ example: "Description", description: "Description of the project" })
  description: string;

  @Column()
  @ApiProperty({ example: "https:://project-preview.com/23wfdsckl.png", description: "Project preview Url" })
  previewUrl: string;

  @Column({ type: "enum", enum: EPhase, default: EPhase.INITIAL })
  @ApiProperty({ example: "Initial", description: "Current phase of the project" })
  phase: EPhase;

  @CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The creation time of the project" })
  createdAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The update time of the project" })
  updatedAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true })
  @ApiProperty({ example: 1596696377370, description: "The deletion time  of the project" })
  deletedAt: number;

  @ManyToOne(type => Organization, organization => organization.staff, {
    onDelete: "CASCADE"
  })
  @ApiProperty({ description: "Project Organization" })
  organization: Organization;

  @ManyToMany(type => User, user => user.projects, {
    cascade: true
  })
  @JoinTable({ name: "projectTeamMember" })
  @ApiProperty({ description: "Project team members" })
  teamMembers: User[];
}
