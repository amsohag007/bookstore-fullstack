import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateUserPointDTO {
  @ApiPropertyOptional({
    description: 'User point',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  point?: number;

  @ApiPropertyOptional({
    description: 'Details  can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  constructor(partial: Partial<UpdateUserPointDTO>) {
    Object.assign(this, partial);
  }
}
