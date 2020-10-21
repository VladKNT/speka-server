import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "./modules/user/user.module";
import { OrganizationModule } from "./modules/organizations/organization.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";

import * as ormconfig from "../resources/config/typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    UserModule,
    OrganizationModule,
    AuthenticationModule,
  ],
})
export class ApplicationModule {}
