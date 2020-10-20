import { hash } from "bcrypt";
import { Exclude } from "class-transformer";
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
  BeforeInsert,
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

  @Column({ unique: true })
  @ApiProperty({ example: "+380 00 00 0000", description: "User contact number" })
  contactNumber: string;

  @Column()
  @Exclude()
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

  @OneToOne(type => UserDetails, { cascade: true })
  @JoinColumn()
  @ApiProperty({ description: "User details", type: UserDetails })
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
  projects: Project[];

  @ManyToMany(type => Component, component => component.assignees)
  @JoinTable({ name: "componentAssignee" })
  assignments: User[];

  @BeforeInsert()
  public async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await hash(this.password, Number(process.env.PASSWORD_SALT));
  }
}
