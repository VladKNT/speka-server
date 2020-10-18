import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
  @IsString()
  @ApiProperty({ type: String, description: "User's refresh token" })
  token: string;

  @IsString()
  @ApiProperty({ type: String, description: "Browser/device fingerprint" })
  fingerprint: string;
}
