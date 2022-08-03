import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';

const db = [];
@Injectable()
export class UserService {
  private users: User[] = db;

  findOne(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`The user with id ${id} is not found`);
    }

    return this.prepareUserDataForClient(user);
  }

  findAll() {
    const preparedUsersData = this.users.map((user) =>
      this.prepareUserDataForClient(user),
    );

    return preparedUsersData;
  }

  create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const timestamp = new Date().getTime();

    this.users.push({
      id,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...createUserDto,
    });

    return this.findOne(id);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`The user with id ${id} is not found`);
    }

    const existingUser = this.users[index];

    if (existingUser.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const timestamp = new Date().getTime();
    const updatedUser = {
      ...existingUser,
      updatedAt: timestamp,
      version: existingUser.version + 1,
      password: updatePasswordDto.newPassword,
    };
    this.users.splice(index, 1, updatedUser);

    return this.findOne(id);
  }

  delete(id: string) {
    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new NotFoundException(`The user with id ${id} doesn't exist`);
    }

    this.users.splice(index, 1);
  }

  prepareUserDataForClient(user: User) {
    const userCopy = { ...user };

    delete userCopy.password;

    return userCopy;
  }
}
