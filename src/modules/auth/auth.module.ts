import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from './../user/user.service';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, UserService, JwtStrategy],
})
export class AuthModule {}