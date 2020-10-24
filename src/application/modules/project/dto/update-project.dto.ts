import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

import { EPhase } from "../../../database/models/project.entity";

export class UpdateProjectDto {
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    example: "345bjklsdv-2323rsv-2sacv2-23vdv",
    description: "Id of the project",
  })
  id: string;

  @IsString()
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
  @MinLength(8)
  @ApiProperty({
    type: String,
    example: "Description",
    description: "Description of the project",
  })
  description?: string;

  @ApiProperty({
    enum: EPhase,
    example: EPhase.PLANNING,
    description: "Phase of the project",
  })
  phase?: EPhase;
}
