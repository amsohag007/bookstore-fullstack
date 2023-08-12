import { Module } from '@nestjs/common';
import { BooksController } from './controllers';
import { BooksService } from './services';
import { ConfigModule } from '@nestjs/config';
import { BooksRepository } from './repository';

@Module({
  imports: [ConfigModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule {}
