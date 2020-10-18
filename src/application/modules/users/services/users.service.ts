import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../../../database/models/user.entity";
import { EPostgresErrorCodes } from "../../../../resources/types/postgresql";

import {
  FIND_BY_ID_ERROR,
  FIND_BY_EMAIL_ERROR,
  EMAIL_ALREADY_EXIST_ERROR,
} from "../../../../resources/constants/strings/errors";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new HttpException(FIND_BY_ID_ERROR, HttpStatus.NOT_FOUND);
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = Object.assign(new User(), createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error?.code === EPostgresErrorCodes.UniqueViolation) {
        throw new HttpException(EMAIL_ALREADY_EXIST_ERROR, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
