import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ type: String, description: "Email" })
  readonly email: string;

  @IsString()
  @ApiProperty({ type: String, description: "Password" })
  readonly password: string;

  @IsString()
  @ApiProperty({ type: String, description: "First name" })
  readonly firstName: string;

  @IsString()
  @ApiProperty({ type: String, description: "Last name" })
  readonly lastName: string;

  @IsString()
  @ApiProperty({ type: String, description: "Browser/device fingerprint" })
  readonly fingerprint: string;

  @IsPhoneNumber(null)
  @ApiProperty({ type: String, description: "Contact Number" })
  readonly contactNumber: string;
}
