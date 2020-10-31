import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "../user/user.module";
import { ComponentService } from "./services/component.service";
import { Component } from "../../database/models/component.entity";
import { ComponentController } from "./controllers/component.controller";
import { ComponentDetails } from "../../database/models/component-details.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Component,
      ComponentDetails,
    ]),
    PassportModule.register({ defaultStrategy: "jwt" }),

    UserModule,
  ],

  providers: [ComponentService],
  controllers: [ComponentController],
})
export class ComponentModule {}
