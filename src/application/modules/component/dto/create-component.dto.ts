import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsUUID, ValidateNested, IsNumber, IsOptional } from "class-validator";

import { CreateComponentDetailsDto } from "./create-component-details.dto";

export class CreateComponentDto {
  @IsString()
  @MinLength(4)
  @MaxLength(128)
  @ApiProperty({
    type: String,
    required: true,
    maxLength: 128,
    example: "Component",
    description: "Component name"
  })
  readonly name: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    type: String,
    required: true,
    example: "Description",
    description: "Component description",
  })
  readonly description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    required: false,
    example: 2000,
    description: "Estimated time",
  })
  readonly estimatedTime?: number;

  @IsOptional()
  @ValidateNested()
  @ApiProperty({
    required: false,
    type: CreateComponentDetailsDto,
    description: "Id of the project",
    example: "def2xs2312kj-23vssd-231wqd",
  })
  readonly details: CreateComponentDetailsDto;

  @IsUUID()
  @ApiProperty({
    type: String,
    required: true,
    description: "Id of the project",
    example: "def2xs2312kj-23vssd-231wqd",
  })
  readonly projectId: string;
}
