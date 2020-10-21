import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "../user/user.module";
import { JwtStrategy} from "./strategies/jwt.strategy";
import { TokenService } from "./services/token.service";
import { LocalStrategy} from "./strategies/local.strategy";
import { RefreshTokenService } from "./services/refresh-token.service";
import { AuthenticationService } from "./services/authentication.service";
import { RefreshToken } from "../../database/models/refresh-token.entity";
import { AuthenticationController } from "./controllers/authentication.controller";

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([RefreshToken]),
    PassportModule.register({ defaultStrategy: "jwt" }),

    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRY },
    }),
  ],

  providers: [
    JwtStrategy,
    TokenService,
    LocalStrategy,
    RefreshTokenService,
    AuthenticationService
  ],

  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
