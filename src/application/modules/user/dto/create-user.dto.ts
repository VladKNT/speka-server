import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

import {
  EMAIL,
  PASSWORD,
  LAST_NAME,
  FIRST_NAME,
  FINGERPRINT,
  CONTACT_NUMBER
} from "../../../../resources/constants/strings/swagger/propertiesDescriptions";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ type: String, description: EMAIL, required: true })
  readonly email: string;

  @IsString()
  @ApiProperty({ type: String, description: PASSWORD, required: true })
  readonly password: string;

  @IsString()
  @ApiProperty({ type: String, description: FIRST_NAME, required: true })
  readonly firstName: string;

  @IsString()
  @ApiProperty({ type: String, description: LAST_NAME, required: true })
  readonly lastName: string;

  @IsString()
  @ApiProperty({ type: String, description: FINGERPRINT, required: true })
  readonly fingerprint: string;

  @IsString()
  @ApiProperty({ type: String, description: CONTACT_NUMBER, required: true })
  readonly contactNumber: string;
}
