import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateComponentDetailsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: "Some features",
    description: "Features of the component",
  })
  readonly features?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: "Some future features",
    description: "Future features of the component",
  })
  readonly futureFeatures?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: "Some notes",
    description: "Notes of the component",
  })
  readonly notes?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: "Some requirements",
    description: "Requirements of the component",
  })
  readonly requirements?: string;
}
