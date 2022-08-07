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

    const accessToken = await this.signAccessToken(user.id, loginDto.login);
    const refreshToken = await this.signRefreshToken(user.id, loginDto.login);

    return { accessToken, refreshToken };
  }

  async refresh(user: any) {
    const accessToken = await this.signAccessToken(user.id, user.login);
    const refreshToken = await this.signRefreshToken(user.id, user.login);

    return { accessToken, refreshToken };
  }

  async signAccessToken(userId: string, login: string) {
    const secret = this.config.get('JWT_SECRET_KEY');
    const expireTime = this.config.get('TOKEN_EXPIRE_TIME');

    const payload = {
      sub: userId,
      login,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: expireTime,
      secret,
    });

    return accessToken;
  }

  async signRefreshToken(userId: string, login: string) {
    const secret = this.config.get('JWT_SECRET_REFRESH_KEY');
    const expireTime = this.config.get('TOKEN_REFRESH_EXPIRE_TIME');
    const payload = {
      sub: userId,
      login,
    };

    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: expireTime,
      secret,
    });

    return refresh_token;
  }
}
