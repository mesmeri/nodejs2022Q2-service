import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);

    return user;
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
