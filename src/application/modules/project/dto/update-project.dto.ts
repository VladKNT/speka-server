import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

import { EPhase } from "../../../database/models/project.entity";

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(128)
  @ApiProperty({
    type: String,
    maxLength: 128,
    example: "Name",
    description: "Name of the project",
  })
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @ApiProperty({
    type: String,
    example: "Description",
    description: "Description of the project",
  })
  description?: string;

  @IsEnum(EPhase)
  @IsOptional()
  @ApiProperty({
    enum: EPhase,
    example: EPhase.PLANNING,
    description: "Phase of the project",
  })
  phase?: EPhase;
}
