import { getConnection, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { User } from "../../../database/models/user.entity";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { Project } from "../../../database/models/project.entity";
import { AssignTeamMemberDto } from "../dto/assign-team-member.dto";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { Component } from "../../../database/models/component.entity";
import { EPostgresErrorCodes } from "../../../../resources/types/postgresql";
import { PaginationInterface } from "../../../../resources/types/common.interface";

import {
  FIND_BY_ID_ERROR,
  FIND_USER_OR_PROJECT_ERROR,
  TEAM_MEMBER_ALREADY_ASSIGNED_ERROR,
} from "../../../../resources/constants/strings/errors";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(userId, organizationId, createProjectDto: CreateProjectDto): Promise<Project> {
    const project = await this.projectRepository.save({ ...createProjectDto, organization: organizationId });
    this.assignTeamMember(project.id, { teamMemberId: userId });

    return project
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<void> {
    const project = Object.assign(new Project(), updateProjectDto, { updatedAt: new Date() });
    const result = await this.projectRepository.update({ id }, project);

    if (!result.affected) {
      throw new HttpException(FIND_BY_ID_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string,  options?: FindOneOptions<Project>): Promise<Project> {
    const project = await this.projectRepository.findOne({ id }, options);

    if (!project) {
      throw new HttpException(FIND_BY_ID_ERROR, HttpStatus.NOT_FOUND);
    }

    return project;
  }

  async findAllUserProjects(userId: string, pagination: PaginationInterface): Promise<Project[]> {
    const { page = 1, limit = 10 } = pagination;
    const offset = (Number(page) - 1) * Number(limit);

    return getConnection()
      .getRepository(Project)
      .createQueryBuilder("project")
      .leftJoin("project.teamMembers", "teamMembers")
      .where("teamMembers.id = :id", { id: userId })
      .limit(limit)
      .offset(offset)
      .orderBy("project.updatedAt", "DESC")
      .getMany();
  }

  async assignTeamMember(projectId: string, { teamMemberId: userId }: AssignTeamMemberDto): Promise<void> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into("projectTeamMember")
        .values([{ projectId, userId }])
        .execute();
    } catch (error) {
      switch (error.code) {
        case EPostgresErrorCodes.UniqueViolation: {
          throw new HttpException(TEAM_MEMBER_ALREADY_ASSIGNED_ERROR, HttpStatus.BAD_REQUEST);
        }

        case EPostgresErrorCodes.ForeignKeyViolation: {
          throw new HttpException(FIND_USER_OR_PROJECT_ERROR, HttpStatus.BAD_REQUEST);
        }
      }
    }
  }

  async findTeamMembers(id: string, pagination: PaginationInterface): Promise<User[]> {
    const { page = 1, limit = 10 } = pagination;
    const offset = (Number(page) - 1) * Number(limit);

    return getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoin("user.projects", "project")
      .where("project.id = :id", { id })
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async findProjectComponents(projectId: string, pagination: PaginationInterface): Promise<Component[]> {
    const { page = 1, limit = 10 } = pagination;
    const offset = (Number(page) - 1) * Number(limit);

    return getConnection()
      .getRepository(Component)
      .createQueryBuilder("component")
      .leftJoin("component.project", "project")
      .where("project.id = :id", { id: projectId })
      .limit(limit)
      .offset(offset)
      .orderBy("project.updatedAt", "DESC")
      .getMany();
  }
}
