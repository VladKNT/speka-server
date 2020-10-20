import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { FINGERPRINT, REFRESH_TOKEN } from "../../../../resources/constants/strings/swagger/propertiesDescriptions";

export class RefreshTokenDto {
  @IsString()
  @ApiProperty({ type: String, description: REFRESH_TOKEN, required: true })
  token: string;

  @IsString()
  @ApiProperty({ type: String, description: FINGERPRINT, required: true })
  fingerprint: string;
}
