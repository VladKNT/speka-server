import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @MinLength(4)
  @MaxLength(128)
  @ApiProperty({
    type: String,
    required: true,
    maxLength: 128,
    example: "Name",
    description: "Name of the project",
  })
  name: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    type: String,
    required: true,
    example: "Description",
    description: "Description of the project",
  })
  description: string;
}
