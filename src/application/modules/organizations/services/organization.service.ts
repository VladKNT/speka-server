import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { User } from "../../../database/models/user.entity";
import { UserService } from "../../user/services/user.service";
import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { Organization } from "../../../database/models/organization.entity";
import { FIND_BY_ID_ERROR } from "../../../../resources/constants/strings/errors";
import { PaginationInterface } from "../../../../resources/types/common.interfaces";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,

    private readonly usersService: UserService,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationRepository.save(createOrganizationDto);
  }

  async findById(id: string): Promise<Organization> {
    const organization = this.organizationRepository.findOne({ id });

    if (!organization) {
      throw new HttpException(FIND_BY_ID_ERROR, HttpStatus.NOT_FOUND);
    }

    return organization;
  }

  async findAll({ page = 1, limit = 10 }: PaginationInterface): Promise<Organization[]> {
    const offset = (page - 1) * limit;
    return this.organizationRepository.find({ skip: offset, take: limit });
  }

  async findOrganizationStaff(id: string, pagination: PaginationInterface): Promise<User[]> {
    return this.usersService.findAll(pagination, {
      relations: ["userDetails"],
      where: { organization: id },
    });
  }
}
