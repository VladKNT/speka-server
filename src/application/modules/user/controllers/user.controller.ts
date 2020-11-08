import { Get,  Param,  Request,  UseGuards, Controller } from "@nestjs/common";

import {
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

import { UserService } from "../services/user.service";
import { User }  from "../../../database/models/user.entity";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiOkResponse({ description: "The current user", type: User })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "User not found" })
  getCurrentUser(@Request() req): Promise<User> {
    return this.userService.findById(req.user.id, { relations: ["userDetails", "organization"] });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiOkResponse({ description: "The user found by id", type: User })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "User not found" })
  getUserById(@Param() params): Promise<User> {
    return this.userService.findById(params.id, { relations: ["userDetails"] });
  }
}
