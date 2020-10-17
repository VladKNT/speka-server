import { Controller, Get, Request, UseGuards } from "@nestjs/common";

import { User}  from "../../../database/models/user.entity";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";

@Controller("users")
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get("current-user")
  getUser(@Request() req): Promise<User> {
    return req.user;
  }
}
