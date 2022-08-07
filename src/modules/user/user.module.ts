import { Module } from '@nestjs/common';

import { UserController } from 'src/modules/user/user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
