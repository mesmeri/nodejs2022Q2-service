import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);

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
      version: 0,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...createUserDto,
    });

    return this.findOne(id);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`The user with id ${id} is not found`);
    }

    const existingUser = this.users[index];

    if (existingUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const timestamp = new Date().getTime();
    const updatedUser = {
      ...existingUser,
      updatedAt: timestamp,
      version: existingUser.version + 1,
      password: updateUserDto.newPassword,
    };
    this.users.splice(index, 1, updatedUser);

    return this.findOne(id);
  }

  delete(id: string) {
    this.users.filter((user) => user.id === id);
  }

  prepareUserDataForClient(user: User) {
    const userCopy = { ...user };

    delete userCopy.password;

    return userCopy;
  }
}
