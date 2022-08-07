import { LoginDto } from './dto/login-dto';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByLogin(loginDto.login);
    const pwMatches = await argon.verify(user?.password, loginDto.password);

    if (!user || !pwMatches) {
      throw new ForbiddenException('Login or password is incorrect');
    }

    const jwt = await this.signToken(user.id, loginDto.password);

    return { access_token: jwt };
  }

  async signToken(userId: string, password: string) {
    const secret = this.config.get('JWT_SECRET_KEY');
    const payload = {
      sub: userId,
      password,
    };

    const jwt = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return jwt;
  }
}
