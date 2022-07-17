import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('userId is invalid (not uuid)');
    }

    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') @Body() id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('userId is invalid (not uuid)');
    }

    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('userId is invalid (not uuid)');
    }

    return this.userService.delete(id);
  }
}
