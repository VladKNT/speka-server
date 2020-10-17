import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "./modules/users/users.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";

import * as ormconfig from "../resources/config/typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    UsersModule,
    AuthenticationModule,
  ],
})
export class ApplicationModule {}
