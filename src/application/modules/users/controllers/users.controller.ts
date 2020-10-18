import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClassSerializerInterceptor, Controller, Get, Request, UseGuards, UseInterceptors } from "@nestjs/common";

import { User }  from "../../../database/models/user.entity";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("User")
@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get("current-user")
  getUser(@Request() req): Promise<User> {
    return req.user;
  }
}
