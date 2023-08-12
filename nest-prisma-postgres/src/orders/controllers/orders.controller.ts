import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Version,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { OrdersService } from 'src/orders/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from 'src/core/dtos';
import { CreateOrderDTO, UpdateOrderDTO, OrderQueryDTO } from '../dtos';
import { Order } from '../entity';

@Controller('orders')
@ApiTags('Order API')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('create')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new order.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Order,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateOrderDTO,
    description: 'Data to create new record..',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(@Body() createOrderDTO: CreateOrderDTO): Promise<ApiResponseDTO<Order>> {
    return await this.ordersService.create(createOrderDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get order by criteria.' })
  @ApiOkResponse({
    type: Order,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: OrderQueryDTO): Promise<ApiResponseDTO<Order[]>> {
    return await this.ordersService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get order by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of a order that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: Order,
    description: 'Record has been retrieved successfully.',
    isArray: false,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(@Param('id') id: string): Promise<ApiResponseDTO<Order>> {
    return await this.ordersService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update order details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: Order,
  })
  @ApiBody({
    type: UpdateOrderDTO,
    description: 'Data to update record.',
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Param('id') id: string,

    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<ApiResponseDTO<Order>> {
    return await this.ordersService.update(id, updateOrderDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete order.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of order that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiNoContentResponse({
    description: 'Record has been deleted successfully.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
