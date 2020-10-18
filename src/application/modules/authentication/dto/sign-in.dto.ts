import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class SignInDto {
  @IsEmail()
  @ApiProperty({ type: String, description: "Email" })
  readonly email: string;

  @IsString()
  @ApiProperty({ type: String, description: "Password" })
  readonly password: string;

  @IsString()
  @ApiProperty({ type: String, description: "Browser/device fingerprint" })
  readonly fingerprint: string;
}
