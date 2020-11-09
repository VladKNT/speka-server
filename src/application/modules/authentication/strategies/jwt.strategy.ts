import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "../../../database/models/user.entity";
import { UserService } from "../../user/services/user.service";
import { TokenPayloadInterface } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UserService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: TokenPayloadInterface): Promise<User> {
    return this.usersService.findById(payload.sub, { relations: ["organization"] });
  }
}
