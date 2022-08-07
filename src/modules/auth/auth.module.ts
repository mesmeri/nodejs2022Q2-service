import { JwtRefreshStrategy } from './strategies/jwt.refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from './../user/user.service';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    UserService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
