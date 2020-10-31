import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "./modules/user/user.module";
import { ProjectModule } from "./modules/project/project.module";
import { ComponentModule } from "./modules/component/component.module";
import { OrganizationModule } from "./modules/organizations/organization.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";

import * as ormconfig from "../resources/config/typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    UserModule,
    ProjectModule,
    ComponentModule,
    OrganizationModule,
    AuthenticationModule,
  ],
})
export class ApplicationModule {}
