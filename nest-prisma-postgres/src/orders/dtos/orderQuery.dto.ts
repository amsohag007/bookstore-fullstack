import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from 'src/core/dtos';
import { OrderStatusEnum } from '@prisma/client';

export class OrderQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'User id',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  userId: string = undefined;

  @ApiPropertyOptional({
    description: 'Order Status.',
    enum: OrderStatusEnum,
    required: true,
  })
  @IsOptional()
  @IsEnum(OrderStatusEnum)
  orderStatus: OrderStatusEnum = undefined;
}
