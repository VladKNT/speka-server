import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { Controller, Request, Post, UseGuards, Body } from "@nestjs/common";

import { SignInDto } from "../dto/sign-in.dto";
import { RefreshTokenDto} from "../dto/refresh-token.dto";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { TokenPairInterface} from "../interfaces/token-pair.interface";
import { AuthenticationService} from "../services/authentication.service";

@ApiTags("Authorization")
@Controller("authentication")
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  @ApiOperation({ summary: "Sign In" })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ description: "The user is signed in successfully", type: TokenPairInterface })
  @ApiUnauthorizedResponse({ description: "Invalid credentials" })
  async signIn(@Request() req): Promise<TokenPairInterface> {
    return this.authService.signIn(req.user, req.body.fingerprint);
  }

  @Post("sign-up")
  @ApiOperation({ summary: "Sign Up" })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: "The user is signed up successfully", type: TokenPairInterface })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async signUp(@Body() createUserDto: CreateUserDto): Promise<TokenPairInterface> {
    return this.authService.signUp(createUserDto);
  }

  @Post("refresh-token")
  @ApiOperation({ summary: "Refresh Token" })
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ description: "The user's tokens are refreshed", type: TokenPairInterface })
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenPairInterface> {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
