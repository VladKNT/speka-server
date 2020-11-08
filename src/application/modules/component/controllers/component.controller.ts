import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";

import {
  ApiBody,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiNoContentResponse, ApiQuery
} from "@nestjs/swagger";

import { User } from "../../../database/models/user.entity";
import { ComponentService } from "../services/component.service";
import { CreateComponentDto } from "../dto/create-component.dto";
import { UpdateComponentDto } from "../dto/update-component.dto";
import { Component } from "../../../database/models/component.entity";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";
import { AssignTeamMemberDto } from "../../project/dto/assign-team-member.dto";
import { CreateComponentDetailsDto } from "../dto/create-component-details.dto";
import { ComponentDetails } from "../../../database/models/component-details.entity";

@ApiBearerAuth()
@ApiTags("Component")
@Controller("component")
export class ComponentController {
  constructor(
    private readonly componentService: ComponentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateComponentDto })
  @ApiCreatedResponse({ description: "The component is successfully created", type: Component })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  createComponent(@Body() createComponentDto: CreateComponentDto): Promise<Component> {
    return this.componentService.create(createComponentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("list")
  @ApiQuery({ name: "page", type: "number", example: 1, description: "Page number", required: false })
  @ApiQuery({ name: "limit", example: 10, description: "Amount of items", required: false })
  @ApiOkResponse({ description: "List of user's components", type: [Component] })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  getUserProjectList(@Request() req, @Query() { page, limit }): Promise<Component[]> {
    return this.componentService.findAllUserComponents(req.user.id, { page, limit });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiOkResponse({ description: "Component", type: Component })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "Component not found" })
  getComponentById(@Param() { id }): Promise<Component> {
    return this.componentService.findById(id, { relations: ["project"] });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @HttpCode(204)
  @ApiBody({ type: UpdateComponentDto })
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiNoContentResponse({ description: "The component was successfully updated" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  updateProject(@Param() { id }, @Body() updateComponentDto: UpdateComponentDto): Promise<void> {
    return this.componentService.updateComponent(id, updateComponentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/component-details")
  @ApiBody({ type: CreateComponentDetailsDto })
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiCreatedResponse({ description: "Component details are successfully created", type: ComponentDetails })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  createComponentDetails(
    @Param() { id },
    @Body() createComponentDetailsDto: CreateComponentDetailsDto
  ): Promise<ComponentDetails> {
    return this.componentService.createComponentDetails(id, createComponentDetailsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/component-details")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiQuery({ name: "version", type: "number", example: 1, description: "Project Details version", required: true })
  @ApiOkResponse({ description: "Component Details", type: ComponentDetails })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "Component Details not found" })
  getComponentDetailsByVersion(@Param() { id }, @Query() { version }): Promise<ComponentDetails> {
    return this.componentService.findComponentDetailsByVersion(id, version);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/component-details/versions-amount")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiOkResponse({ description: "Component Details versions amount", type: Number })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "Component details not found" })
  getComponentDetailsVersionAmount(@Param() { id }): Promise<number> {
    return this.componentService.findProjectDetailsVersionsAmount(id);
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
    @Body() assignTeamMemberDto: AssignTeamMemberDto,
  ): Promise<void> {
    return this.componentService.assignTeamMember(id, assignTeamMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/team-member/list")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiQuery({ name: "page", type: "number", example: 1, description: "Page number", required: false })
  @ApiQuery({ name: "limit", example: 10, description: "Amount of items", required: false })
  @ApiOkResponse({ description: "List of team members", type: [User] })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  getTeamMember(@Param() { id }, @Query() { page, limit }): Promise<User[]> {
    return this.componentService.findTeamMembers(id, { page, limit });
  }
}
