import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { User } from "../../../database/models/user.entity";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authenticationService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
