import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsNumber, IsOptional, IsEnum } from "class-validator";

import { EStatus } from "../../../database/models/component.entity";

export class UpdateComponentDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(128)
  @ApiProperty({
    type: String,
    maxLength: 128,
    required: false,
    example: "Component",
    description: "Component name"
  })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @ApiProperty({
    type: String,
    required: false,
    example: "Description",
    description: "Component description",
  })
  readonly description?: string;

  @IsEnum(EStatus)
  @IsOptional()
  @ApiProperty({
    type: "enum",
    enum: EStatus,
    required: false,
    description: "Phase",
    example: EStatus.PLANNING,
  })
  readonly phase?: EStatus;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 2000,
    required: false,
    description: "Estimated time",
  })
  readonly estimatedTime?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 2000,
    required: false,
    description: "Spent time",
  })
  readonly spentTime?: number;
}
