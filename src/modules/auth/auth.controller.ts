import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const jwt = await this.authService.signToken(
      createUserDto.login,
      createUserDto.password,
    );

    return { access_token: jwt };
  }
}
