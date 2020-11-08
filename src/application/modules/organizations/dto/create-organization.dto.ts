import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

import {
  EMAIL,
  CONTACT_NUMBER
} from "../../../../resources/constants/strings/swagger/propertiesDescriptions";

export class CreateOrganizationDto {
  @IsEmail()
  @ApiProperty({ type: String, description: EMAIL, required: true })
  readonly email: string;

  @IsString()
  @ApiProperty({ type: String, description: "The name of the organization", required: true })
  readonly name: string;

  @IsString()
  @ApiProperty({ type: String, description: CONTACT_NUMBER, required: true })
  readonly contactNumber: string;
}
