import { compare } from "bcrypt";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { User } from "../../../database/models/user.entity";
import { RefreshTokenService } from "./refresh-token.service";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { UserService } from "../../user/services/user.service";
import { TokenPairInterface } from "../interfaces/token-pair.interface";
import { WRONG_PASSWORD_ERROR } from "../../../../resources/constants/strings/errors";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  private async verifyPassword(password: string, hashedPassword: string): Promise<void> {
    const isPasswordMatching = await compare(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException(WRONG_PASSWORD_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    await this.verifyPassword(password, user.password);

    return user;
  }

  async signIn(user: User, fingerprint: string): Promise<TokenPairInterface> {
    return this.refreshTokenService.create(user, fingerprint);
  }

  async signUp(createUserDto: CreateUserDto): Promise<TokenPairInterface> {
    const createdUser = await this.usersService.create(createUserDto);
    return this.signIn(createdUser, createUserDto.fingerprint);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<TokenPairInterface> {
    return this.refreshTokenService.refresh(refreshTokenDto);
  }
}
