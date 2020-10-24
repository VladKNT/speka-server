import { UseGuards, Controller, Post, Body, Get, Param, Query } from "@nestjs/common";

import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse
} from "@nestjs/swagger";

import { User } from "../../../database/models/user.entity";
import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { OrganizationService } from "../services/organization.service";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";
import { Organization } from "../../../database/models/organization.entity";

@ApiBearerAuth()
@ApiTags("Organization")
@Controller("organization")
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateOrganizationDto })
  @ApiCreatedResponse({ description: "The organization is successfully created", type: Organization })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  createOrganization(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationService.create(createOrganizationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/list")
  @ApiQuery({ name: "page", type: "number", example: 1, description: "Page number", required: false })
  @ApiQuery({ name: "limit", example: 10, description: "Amount of items", required: false })
  @ApiOkResponse({ description: "Organization", type: Organization })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "Organization not found" })
  getOrganizations(@Query() params): Promise<Organization[]> {
    return this.organizationService.findAll(params);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiOkResponse({ description: "Organization", type: Organization })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "Organization not found" })
  getOrganizationById(@Param() params): Promise<Organization> {
    return this.organizationService.findById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/staff/list/")
  @ApiParam({ name: "id",  type: "string", required: true })
  @ApiQuery({ name: "page", type: "number", example: 1, description: "Page number", required: false })
  @ApiQuery({ name: "limit", example: 10, description: "Amount of items", required: false })
  @ApiOkResponse({ description: "Organization's staff", type: [User] })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  getOrganizationStaff(@Param() { id }, @Query() { page, limit }): Promise<User[]> {
    return this.organizationService.findOrganizationStaff(id, { page, limit });
  }
}
