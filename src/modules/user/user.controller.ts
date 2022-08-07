import { StatusCodes } from 'http-status-codes';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt-guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return this.userService.update(id, updatePasswordDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
