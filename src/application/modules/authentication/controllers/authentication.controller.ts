import { Controller, Request, Post, UseGuards, Body } from "@nestjs/common";

import { RefreshTokenDto} from "../dto/refresh-token.dto";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { TokenPairInterface} from "../interfaces/token-pair.interface";
import { AuthenticationService} from "../services/authentication.service";

@Controller("authentication")
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  async signIn(@Request() req): Promise<TokenPairInterface> {
    return this.authService.signIn(req.user, req.body.fingerprint);
  }

  @Post("sign-up")
  async signUp(@Body() createUserDto: CreateUserDto): Promise<TokenPairInterface> {
    return this.authService.signUp(createUserDto);
  }

  @Post("refresh-token")
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenPairInterface> {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
