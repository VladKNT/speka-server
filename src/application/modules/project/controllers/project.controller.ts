import { UseGuards, Controller, Post, Body, Get, Param, Patch, HttpCode, Query, Request } from "@nestjs/common";

import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse, ApiQuery,
} from "@nestjs/swagger";

import { User } from "../../../database/models/user.entity";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { CreateProjectDto } from "../dto/create-project.dto";
import { ProjectService } from "../services/project.service";
import { Project } from "../../../database/models/project.entity";
import { AssignTeamMemberDto } from "../dto/assign-team-member.dto";
import { Component } from "../../../database/models/component.entity";
import { JwtAuthGuard} from "../../authentication/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("Project")
@Controller("project")
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateProjectDto })
  @ApiCreatedResponse({ description: "The project is successfully created", type: Project })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  createProject(@Request() req, @Body() createProjectDto: CreateProjectDto): Promise<Project> {
    const {
      id: userId,
      organization: {
        id: organizationId
      },
    } = req.user;
    return this.projectService.create(userId, organizationId, createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("list")
  @ApiQuery({ name: "page", type: "number", example: 1, description: "Page number", required: false })
  @ApiQuery({ name: "limit", example: 10, description: "Amount of items", required: false })
  @ApiOkResponse({ description: "List of user's projects", type: [Project] })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  getUserProjectList(@Request() req, @Query() { page, limit }): Promise<Project[]> {
    return this.projectService.findAllUserProjects(req.user.id, { page, limit });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @HttpCode(204)
  @ApiBody({ type: UpdateProjectDto })
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiNoContentResponse({ description: "The project was successfully updated" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  updateProject(@Param() { id }, @Body() updateProjectDto: UpdateProjectDto): Promise<void> {
    return this.projectService.update(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiBody({ type: AssignTeamMemberDto })
  @ApiNoContentResponse({ description: "The team member was successfully assigned" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  getProjectById(@Param() { id }): Promise<Project> {
    return this.projectService.findById(id, { relations: ["organization"] });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id/team-member/assign")
  @HttpCode(204)
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiBody({ type: AssignTeamMemberDto })
  @ApiNoContentResponse({ description: "The team member was successfully assigned" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  assignTeamMember(
    @Param() { id },
    @Body() assignTeamMemberDto: AssignTeamMemberDto
  ): Promise<void> {
    return this.projectService.assignTeamMember(id, assignTeamMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/team-member/list")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiQuery({ name: "page", type: "number", example: 1, description: "Page number", required: false })
  @ApiQuery({ name: "limit", example: 10, description: "Amount of items", required: false })
  @ApiOkResponse({ description: "List of team members", type: [User] })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  getTeamMembers(@Param() { id }, @Query() { page, limit }): Promise<User[]> {
    return this.projectService.findTeamMembers(id, { page, limit });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/component/list")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiQuery({ name: "page", type: "number", example: 1, description: "Page number", required: false })
  @ApiQuery({ name: "limit", example: 10, description: "Amount of items", required: false })
  @ApiOkResponse({ description: "List of project components", type: [Component] })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  findProjectComponents(@Param() { id }, @Query() { page, limit }): Promise<Component[]> {
    return this.projectService.findProjectComponents(id, { page, limit });
  }
}
