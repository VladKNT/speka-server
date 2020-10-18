import { ApiResponseProperty } from "@nestjs/swagger";

export class TokenPairInterface {
  @ApiResponseProperty({ type: String })
  readonly accessToken: string;

  @ApiResponseProperty({ type: String })
  readonly refreshToken: string;
}
