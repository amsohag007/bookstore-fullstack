import { Book } from '@prisma/client';
import { PrismaService } from 'src/core/services';
import { CreateBookDTO, UpdateBookDTO, BookQueryDTO } from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateBookDTO): Promise<Book> {
    return this.prismaService.book.create({ data });
  }

  async findMany(query: BookQueryDTO): Promise<Book[]> {
    const filters = {
      title: query.title,
    };

    return await this.prismaService.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: query.pageSize,
      skip: (query.pageIndex - 1) * query.pageSize,
      where: filters,
    });
  }

  async count(query: object): Promise<number> {
    return await this.prismaService.book.count(query);
  }

  async findOne(id: string): Promise<Book | null> {
    return this.prismaService.book.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateBookDTO): Promise<Book | null> {
    return this.prismaService.book.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Book | null> {
    return this.prismaService.book.delete({ where: { id } });
  }
}
