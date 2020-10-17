import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

import { ITokenConfig } from "../../../../resources/types/token";
import { tokenConfig } from "../../../../resources/config/token.config";
import { TokenPairInterface } from "../interfaces/token-pair.interface";
import { TokenPayloadInterface } from "../interfaces/token-payload.interface";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(userId: string, config: ITokenConfig): Promise<string> {
    const { type, expiresIn, secret } = config;
    const payload: TokenPayloadInterface = { sub: userId, tokenType: type };

    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
      algorithm: "HS512",
    });
  }

  async generateTokenPair(userId: string): Promise<TokenPairInterface> {
    const accessToken = await this.createToken(userId, tokenConfig.access);
    const refreshToken = await this.createToken(userId, tokenConfig.refresh);

    return { accessToken, refreshToken };
  }

  getHashTokenPart (token: string): string {
    return token.split(".")[2];
  }
}
