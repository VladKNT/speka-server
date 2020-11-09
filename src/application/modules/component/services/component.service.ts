import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { User } from "../../../database/models/user.entity";
import { UserService } from "../../user/services/user.service";
import { CreateComponentDto } from "../dto/create-component.dto";
import { UpdateComponentDto } from "../dto/update-component.dto";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { Component } from "../../../database/models/component.entity";
import { EPostgresErrorCodes } from "../../../../resources/types/postgresql";
import { AssignTeamMemberDto } from "../../project/dto/assign-team-member.dto";
import { CreateComponentDetailsDto } from "../dto/create-component-details.dto";
import { PaginationInterface } from "../../../../resources/types/common.interface";
import { ComponentDetails } from "../../../database/models/component-details.entity";

import {
  FIND_BY_ID_ERROR,
  FIND_USER_OR_COMPONENT_ERROR,
  TEAM_MEMBER_ALREADY_ASSIGNED_ERROR,
  FIND_COMPONENT_DETAILS_VERSION_ID_ERROR,
} from "../../../../resources/constants/strings/errors";

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,

    @InjectRepository(ComponentDetails)
    private componentDetailsRepository: Repository<ComponentDetails>,

    private readonly usersService: UserService,
  ) {}

  create({ details: detailsData, ...componentData }: CreateComponentDto): Promise<Component> {
    const component = Object.assign(new Component(),{
      ...componentData,
      project: componentData.projectId,
    });

    component.details = [
      Object.assign(new ComponentDetails(), {
        ...detailsData,
        version: 1,
      }),
    ];

    return this.componentRepository.save(component);
  }

  async findById(id: string,  options?: FindOneOptions<Component>): Promise<Component> {
    const component = await this.componentRepository.findOne(id, options);

    if (!component) {
      throw new HttpException(FIND_BY_ID_ERROR, HttpStatus.NOT_FOUND);
    }

    return component;
  }

  async findAllUserComponents(userId: string, pagination: PaginationInterface): Promise<Component[]> {
    const { page = 1, limit = 10 } = pagination;
    const offset = (Number(page) - 1) * Number(limit);

    return getConnection()
      .getRepository(Component)
      .createQueryBuilder("component")
      .leftJoin("component.assignees", "assignees")
      .where("assignees.id = :id", { id: userId })
      .limit(limit)
      .offset(offset)
      .orderBy("component.updatedAt", "DESC")
      .getMany();
  }

  async updateComponent(id: string, updateComponentDto: UpdateComponentDto): Promise<void> {
    const component = Object.assign(new Component(), updateComponentDto, { updatedAt: new Date() });
    const result = await this.componentRepository.update({ id }, component);

    if (!result.affected) {
      throw new HttpException(FIND_BY_ID_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async findProjectDetailsVersionsAmount(componentId: string): Promise<number> {
    return await this.componentDetailsRepository.count({ component: componentId });
  }

  async createComponentDetails(
    componentId: string,
    createComponentDetailsDto: CreateComponentDetailsDto,
  ): Promise<ComponentDetails> {
    const versionsAmount = await this.findProjectDetailsVersionsAmount(componentId);
    const version = versionsAmount + 1;

    const componentDetails = Object.assign(new ComponentDetails(), createComponentDetailsDto, {
      version,
      component: componentId,
    });

    return this.componentDetailsRepository.save(componentDetails);
  }

  async findComponentDetailsByVersion(componentId: string, version: number): Promise<ComponentDetails> {
    const componentDetails = await this.componentDetailsRepository.findOne({
      version,
      component: componentId,
    });

    if (!componentDetails) {
      throw new HttpException(FIND_COMPONENT_DETAILS_VERSION_ID_ERROR, HttpStatus.NOT_FOUND);
    }

    return componentDetails;
  }


  //TODO: Check project and users assigned to it
  async assignTeamMember(componentId: string, { teamMemberId: userId }: AssignTeamMemberDto): Promise<void> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into("componentAssignee")
        .values([{ componentId, userId }])
        .execute();
    } catch (error) {
      switch (error.code) {
        case EPostgresErrorCodes.UniqueViolation: {
          throw new HttpException(TEAM_MEMBER_ALREADY_ASSIGNED_ERROR, HttpStatus.BAD_REQUEST);
        }

        case EPostgresErrorCodes.ForeignKeyViolation: {
          throw new HttpException(FIND_USER_OR_COMPONENT_ERROR, HttpStatus.BAD_REQUEST);
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
      .leftJoin("user.assignments", "assignment")
      .where("assignment.id = :id", { id })
      .limit(limit)
      .offset(offset)
      .getMany();
  }
}
