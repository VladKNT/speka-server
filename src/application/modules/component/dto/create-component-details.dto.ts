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
  features?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: "Some future features",
    description: "Future features of the component",
  })
  futureFeatures?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: "Some notes",
    description: "Notes of the component",
  })
  notes?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: "Some requirements",
    description: "Requirements of the component",
  })
  requirements?: string;
}
