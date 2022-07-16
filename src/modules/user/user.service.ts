import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './interfaces/create-user.interface';
import { UpdatePasswordDto } from './interfaces/update-password.interface';
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

    if (index !== -1) {
      const timestamp = new Date().getTime();
      const updatedUser = {
        ...this.users[index],
        updatedAt: timestamp,
        password: updateUserDto.newPassword,
      };
      this.users.splice(index, 1, updatedUser);

      return this.findOne(id);
    }
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
