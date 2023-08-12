import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { IsDefined, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiPropertyOptional({
    description: 'First Name',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional({
    description: 'Last Name',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'UserName ',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'Email',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    description: 'Phone ',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    description: 'Details/images link can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  constructor(partial: Partial<CreateUserDTO>) {
    Object.assign(this, partial);
  }
}
