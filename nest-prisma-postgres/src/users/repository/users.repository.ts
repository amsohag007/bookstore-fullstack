import { User } from '@prisma/client';
import { PrismaService } from 'src/core/services';
import { CreateUserDTO, UpdateUserDTO, UserQueryDTO } from '../dtos';
import { Injectable } from '@nestjs/common';
import { UpdateUserPointDTO } from '../dtos/updateUserPoint.dto';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUserDTO): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async findMany(query: UserQueryDTO): Promise<User[]> {
    const filters = {
      email: query.email,
      userName: query.userName,
      phone: query.phone,
    };

    return await this.prismaService.user.findMany({
      orderBy: {
        createdAt: query.orderBy,
      },
      take: query.pageSize,
      skip: (query.pageIndex - 1) * query.pageSize,
      where: filters,
      include: {
        orders: true,
      },
    });
  }

  async count(query: object): Promise<number> {
    return await this.prismaService.user.count(query);
  }

  async findOne(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      include: {
        orders: true,
      },
    });
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    return this.prismaService.user.update({ where: { id }, data });
  }

  async updatePoint(id: string, data: UpdateUserPointDTO): Promise<User | null> {
    return this.prismaService.user.update({ where: { id }, data });
  }

  async remove(id: string): Promise<User | null> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
