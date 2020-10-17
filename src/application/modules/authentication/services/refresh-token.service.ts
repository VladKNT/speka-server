import { Repository } from "typeorm";
import { compare, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { TokenService } from "./token.service";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { User } from "../../../database/models/user.entity";
import { ETokenType } from "../../../../resources/types/token";
import { UsersService } from "../../users/services/users.service";
import { TokenPairInterface } from "../interfaces/token-pair.interface";
import { tokenConfig } from "../../../../resources/config/token.config";
import { RefreshToken } from "../../../database/models/refresh-token.entity";

import {
  TOKEN_EXPIRED_ERROR,
  INVALID_TOKEN_TYPE_ERROR,
  FALSE_REFRESH_TOKEN_ERROR,
  INVALID_TOKEN_SIGNATURE_ERROR,
} from "../../../../resources/constants/strings/errors";

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,

    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  private async verifyExpiration(expirationTime: number, userId: any): Promise<void> {
    const currentDate = new Date();

    if (expirationTime < currentDate.getTime() / 1000) {
      await this.refreshTokenRepository.delete({ user: userId });
      throw new HttpException(TOKEN_EXPIRED_ERROR, HttpStatus.UNAUTHORIZED);
    }
  }

  private async verifyType(tokenType: ETokenType, userId: any): Promise<void> {
    const { type } = tokenConfig.refresh;

    if (type !== tokenType) {
      await this.refreshTokenRepository.delete({ user: userId });
      throw new HttpException(INVALID_TOKEN_TYPE_ERROR, HttpStatus.UNAUTHORIZED);
    }
  }

  private async verifySecret(token: string, userId: any): Promise<void> {
    try {
      const { secret } = tokenConfig.refresh;
      await this.jwtService.verify(token, { secret });
    } catch (e) {
      await this.refreshTokenRepository.delete({ user: userId });
      throw new HttpException(INVALID_TOKEN_SIGNATURE_ERROR, HttpStatus.UNAUTHORIZED);
    }
  }

  private async verifyDatabaseRecord(token: string, fingerprint: string, userId: any): Promise<void> {
    const oldRefreshTokenInfo = await this.refreshTokenRepository.findOne({ user: userId });

    const validationFailed = async (): Promise<void> => {
      await this.refreshTokenRepository.delete({ user: userId });
      throw new HttpException(FALSE_REFRESH_TOKEN_ERROR, HttpStatus.UNAUTHORIZED);
    }

    if (!oldRefreshTokenInfo) {
      await validationFailed();
    }

    const hashTokenPart = this.tokenService.getHashTokenPart(token);
    const isRefreshTokenMatching = await compare(hashTokenPart, oldRefreshTokenInfo?.token);
    const isFingerprintMatching = await compare(fingerprint, oldRefreshTokenInfo?.fingerprint);

    if (!isRefreshTokenMatching || !isFingerprintMatching) {
      await validationFailed();
    }
  }

  async create(user: User, fingerprint: string): Promise<TokenPairInterface> {
    const userId = user.id as any;
    const tokenPair = await this.tokenService.generateTokenPair(userId);

    const hashTokenPart = this.tokenService.getHashTokenPart(tokenPair.refreshToken);
    const hashedToken = await hash(hashTokenPart, Number(process.env.REFRESH_TOKEN_SALT));
    const hashedFingerprint = await hash(fingerprint, Number(process.env.FINGERPRINT_SALT));

    const refreshToken = Object.assign(new RefreshToken(), {
      user,
      token: hashedToken,
      fingerprint: hashedFingerprint,
    });

    await this.refreshTokenRepository.delete({ user: userId });
    await this.refreshTokenRepository.save(refreshToken);

    return tokenPair;
  }

  async refresh({ token, fingerprint }: RefreshTokenDto): Promise<TokenPairInterface> {
    const { sub: userId, exp, tokenType }: any = await this.jwtService.decode(token);

    await this.verifyExpiration(exp, userId);
    await this.verifyType(tokenType, userId);

    await this.verifySecret(token, userId);
    await this.verifyDatabaseRecord(token, fingerprint, userId);

    const user: User = await this.usersService.findById(userId);

    return this.create(user, fingerprint);
  }
}
