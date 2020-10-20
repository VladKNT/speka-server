import {
  Get,
  Param,
  Request,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";

import {
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

import { UsersService } from "../services/users.service";
import { User }  from "../../../database/models/user.entity";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("User")
@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("current-user")
  @ApiOkResponse({ description: "The current user", type: User })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "User not found" })
  getCurrentUser(@Request() req): Promise<User> {
    return this.usersService.findById(req.user.id, { relations: ["userDetails"] });
  }

  @UseGuards(JwtAuthGuard)
  @Get("user/:id")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiOkResponse({ description: "The user found by id", type: User })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "User not found" })
  getUserById(@Param() params): Promise<User> {
    return this.usersService.findById(params.id, { relations: ["userDetails"] });
  }
}
