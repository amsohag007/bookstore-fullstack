import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CoreModule, UsersModule, BooksModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
