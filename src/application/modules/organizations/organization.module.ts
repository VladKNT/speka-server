import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";

import { OrganizationService } from "./services/organization.service";
import { Organization } from "../../database/models/organization.entity";
import { OrganizationController } from "./controllers/organization.controller";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    PassportModule.register({ defaultStrategy: "jwt" }),

    UserModule,
  ],

  providers: [OrganizationService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
