import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";

import { UserService } from "./services/user.service";
import { User } from "../../database/models/user.entity";
import { UserController } from "./controllers/user.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],

  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
