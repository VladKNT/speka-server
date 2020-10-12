import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  JoinTable,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Role } from "./role.entity";
import { Project } from "./project.entity";
import { Component } from "./component.entity";
import { UserDetails } from "./user-details.entity";
import { Organization } from "./organization.entity";
import { RefreshToken } from "./refresh-token.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: "333a1c84-d7ab-11ea-87d0-0242ac130003", description: "User uuid" })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: "john@doe.com", description: "User email" })
  email: string;

  @Column()
  @ApiProperty({ example: "+380 00 00 0000", description: "User contact number" })
  contactNumber: string;

  @Column()
  @ApiProperty({ example: "sdfbk32sjosdclk23bkjdfgdfdfgdfgdfgc", description: "User password" })
  password: string;

  @CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The creation time of the organization" })
  createdAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The update time of the organization" })
  updatedAt: number;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true })
  @ApiProperty({ example: 1596696377370, description: "The deletion time  of the organization" })
  deletedAt: number;

  @OneToOne(type => UserDetails)
  @JoinColumn()
  @ApiProperty({ description: "User details" })
  userDetails: UserDetails;

  @ManyToOne(type => Role, role => role.users)
  @ApiProperty({ description: "User role" })
  role: Role;

  @ManyToOne(type => Organization, organization => organization.staff)
  @ApiProperty({ description: "User organization" })
  organization: Organization;

  @OneToMany(type => RefreshToken, refreshToken => refreshToken.token)
  refreshTokens: RefreshToken[];

  @ManyToMany(type => Project, project => project.teamMembers)
  @JoinTable({ name: "projectTeamMember" })
  @ApiProperty({ description: "User projects" })
  projects: Project[];

  @ManyToMany(type => Component, component => component.assignees)
  @JoinTable({ name: "componentAssignee" })
  @ApiProperty({ description: "User components' assignments" })
  assignments: User[];
}
