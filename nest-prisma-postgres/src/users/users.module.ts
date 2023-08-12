import { Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { UsersService } from './services';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from './repository';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
