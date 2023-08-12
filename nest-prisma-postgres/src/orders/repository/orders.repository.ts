import { Order } from '@prisma/client';
import { PrismaService } from 'src/core/services';
import { CreateOrderDTO, UpdateOrderDTO, OrderQueryDTO } from '../dtos';
import { Injectable } from '@nestjs/common';
import { Book } from 'src/books/entity';

@Injectable()
export class OrdersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(createOrderDTO: CreateOrderDTO): Promise<Order> {
    return this.prismaService.order.create({
      data: {
        userId: createOrderDTO.userId,
        orderItems: {
          create: createOrderDTO.books.map((bookId) => ({ bookId: bookId })),
        },
      },
      include: {
        orderItems: {
          include: {
            books: true,
          },
        },
      },
    });
  }

  async findBooks(createOrderDTO: CreateOrderDTO): Promise<Book[]> {
    return this.prismaService.book.findMany({
      where: {
        id: {
          in: createOrderDTO.books,
        },
      },
    });
  }

  async findMany(query: OrderQueryDTO): Promise<Order[]> {
    const filters = {
      userId: query.userId,
      orderStatus: query.orderStatus,
    };

    return await this.prismaService.order.findMany({
      orderBy: {
        createdAt: query.orderBy,
      },
      take: query.pageSize,
      skip: (query.pageIndex - 1) * query.pageSize,
      where: filters,
      include: {
        orderItems: {
          include: {
            books: true,
          },
        },
      },
    });
  }

  async count(query: object): Promise<number> {
    return await this.prismaService.order.count(query);
  }

  async findOne(id: string): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            books: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateOrderDTO): Promise<Order | null> {
    return this.prismaService.order.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Order | null> {
    return this.prismaService.order.delete({ where: { id } });
  }
}
