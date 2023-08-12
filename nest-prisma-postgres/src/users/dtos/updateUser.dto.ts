import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    description: 'UserName ',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  userName: string;

  @ApiPropertyOptional({
    description: 'User firstName.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional({
    description: 'User lastName.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    description: 'User email ',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional({
    description: 'User email ',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    description: 'Details  can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  constructor(partial: Partial<UpdateUserDTO>) {
    Object.assign(this, partial);
  }
}
