import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.services';
import { ApiResponseDTO } from 'src/core/dtos';
import { CreateOrderDTO, UpdateOrderDTO, OrderQueryDTO } from '../dtos';
import * as argon2 from 'argon2';
import { PrismaErrorHandler } from 'src/core/handlers/prisma-error.handler';
import { NotDataFoundResponse } from 'src/core/constants';
import { Order } from '../entity';
import { OrdersRepository } from '../repository';
import { UsersRepository } from 'src/users/repository';
import { UpdateUserDTO } from 'src/users/dtos';
import { UpdateUserPointDTO } from 'src/users/dtos/updateUserPoint.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository, private usersRepository: UsersRepository) {}

  //create new --------
  async create(createOrderDTO: CreateOrderDTO): Promise<ApiResponseDTO<Order>> {
    try {
      const books = await this.ordersRepository.findBooks(createOrderDTO);

      // console.log('books', books);

      if (books.length !== createOrderDTO.books.length) {
        throw new NotFoundException('One or more books not found.');
      }

      const totalPrice = books.reduce((accumulator, book) => accumulator + book.price, 0);

      const user = await this.usersRepository.findOne(createOrderDTO.userId);

      if (totalPrice > user.point) {
        throw new BadRequestException('You donot have enough point to place this order!');
      }

      let updateUserPointDto: UpdateUserPointDTO = {
        point: user.point - totalPrice,
      };

      const updateUserPoint = await this.usersRepository.updatePoint(createOrderDTO.userId, updateUserPointDto);

      const order = await this.ordersRepository.create(createOrderDTO);

      return {
        status: 'success',
        data: order,
        message: 'Orders created successfully.',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  // find all-------- can be filtered by criteria

  async findByCriteria(query: OrderQueryDTO): Promise<ApiResponseDTO<Order[]>> {
    try {
      const filters = {
        userId: query.userId,
      };

      const totalCount = await this.ordersRepository.count(filters);
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NotDataFoundResponse;
      }

      const orders = await this.ordersRepository.findMany(query);

      return {
        status: 'success',
        message: ' Orders have been retrieved.',
        data: orders,
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<Order>> {
    try {
      const order = await this.ordersRepository.findOne(id);

      if (order === null) {
        return NotDataFoundResponse;
      }
      return {
        status: 'success',
        data: order,
        message: ' Order has been retrieved.',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(id: string, updateOrderDTO: UpdateOrderDTO): Promise<ApiResponseDTO<Order>> {
    try {
      const updatedOrderData = await this.ordersRepository.update(id, updateOrderDTO);
      return {
        status: 'success',
        data: updatedOrderData,
        message: ' Orders info has been updated.',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string): Promise<Order> {
    try {
      const order = await this.ordersRepository.findOne(id);

      if (!order) {
        throw new ForbiddenException('No Order found.');
      }

      return await this.ordersRepository.remove(id);
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }
}
