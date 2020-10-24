import { FindManyOptions, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../../../database/models/user.entity";
import { UserDetails } from "../../../database/models/user-details.entity";
import { EPostgresErrorCodes } from "../../../../resources/types/postgresql";
import { PaginationInterface } from "../../../../resources/types/common.interface";

import {
  FIND_BY_EMAIL_ERROR,
  FIND_USER_BY_ID_ERROR,
  EMAIL_ALREADY_EXIST_ERROR,
} from "../../../../resources/constants/strings/errors";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string,  options?: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne({ id }, options);

    if (!user) {
      throw new HttpException(FIND_USER_BY_ID_ERROR, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new HttpException(FIND_BY_EMAIL_ERROR, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findAll({ page = 1, limit = 10 }: PaginationInterface, options?: FindManyOptions<User>): Promise<User[]> {
    const offset = (Number(page) - 1) * Number(limit);

    return this.userRepository.find({
      skip: offset,
      take: limit,
      ...options,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { firstName, lastName, ...userData } = createUserDto;

      const user = Object.assign(new User(), userData);
      user.userDetails = Object.assign(new UserDetails(), { firstName, lastName });

      return await this.userRepository.save(user);
    } catch (error) {
      if (error?.code === EPostgresErrorCodes.UniqueViolation) {
        throw new HttpException(EMAIL_ALREADY_EXIST_ERROR, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
