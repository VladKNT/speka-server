import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";

import { ProjectService } from "./services/project.service";
import { Project } from "../../database/models/project.entity";
import { ProjectController } from "./controllers/project.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],

  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
