import { Module } from '@nestjs/common';
import { OrdersController } from './controllers';
import { OrdersService } from './services';
import { ConfigModule } from '@nestjs/config';
import { OrdersRepository } from './repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
