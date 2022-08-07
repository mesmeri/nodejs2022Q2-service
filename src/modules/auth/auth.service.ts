import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signToken(login: string, password: string) {
    const secret = this.config.get('JWT_SECRET_KEY');
    const payload = {
      login,
      password,
    };

    const jwt = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return jwt;
  }
}
