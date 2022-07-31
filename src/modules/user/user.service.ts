import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as argon from 'argon2';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    console.log({ user });

    if (!user) {
      throw new NotFoundException(`The user with id ${id} is not found`);
    }

    // TODO: replace using prisma
    delete user.password;

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    // TODO: replace using prisma
    users.forEach((u) => {
      delete u.password;
    });

    return users;
  }

  async create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const hash = await argon.hash(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        id,
        version: 1,
        password: hash,
        login: createUserDto.login,
      },
    });

    // TODO: replace using prisma
    delete user.password;

    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`The user with id ${id} is not found`);
    }

    const pwMatches = await argon.verify(
      user.password,
      updatePasswordDto.oldPassword,
    );

    if (!pwMatches) {
      throw new ForbiddenException('Old password is wrong');
    }

    const hash = await argon.hash(updatePasswordDto.newPassword);

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hash,
      },
    });

    // TODO: replace using prisma
    delete updatedUser.password;

    return updatedUser;
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`The user with id ${id} doesn't exist`);
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
