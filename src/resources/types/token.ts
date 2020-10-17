import { JwtVerifyOptions } from "@nestjs/jwt/dist/interfaces/jwt-module-options.interface";

export enum ETokenType {
  TOKEN_TYPE_ACCESS = "TOKEN_TYPE_ACCESS",
  TOKEN_TYPE_REFRESH = "TOKEN_TYPE_REFRESH",
}

export interface ITokenConfig {
  secret: string;
  type: ETokenType;
  expiresIn: string;
}

export type TVerifyTokeCallback = (token: string, options?: JwtVerifyOptions) => void;
