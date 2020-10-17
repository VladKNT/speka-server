import { ETokenType } from "../../../../resources/types/token";

export class TokenPayloadInterface {
  readonly sub: string;
  readonly tokenType: ETokenType;
}
