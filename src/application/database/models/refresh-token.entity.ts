import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

import { User } from "./user.entity";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: "333a1c84-d7ab-11ea-87d0-0242ac130003", description: "Refresh token uuid" })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: "1eyJ0eXAiOiJKV1QiLCIUzI1NiJ9.eyJpc3MiOiJgS", description: "Refresh token" })
  token: string;

  @Column({ length: 128 })
  @ApiProperty({ example: "kbj239xc0vvbhasb3459gshx", description: "Browser fingerprint" })
  fingerprint: string;

  @Column({ type: "bigint" })
  @ApiProperty({ example: 1596696377370, description: "The expiration time of the refresh token" })

  @CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty({ example: 1596696377370, description: "The creation time of the refresh toke" })
  createdAt: number;

  @ManyToOne(type => User, user => user.refreshTokens, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  @ApiProperty({ description: "The refresh token owner" })
  user: User;
}
