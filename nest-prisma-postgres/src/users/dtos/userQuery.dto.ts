import { BaseQueryCriteriaDTO } from 'src/core/dtos';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UserQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'UserName',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  userName?: string = undefined;

  @ApiPropertyOptional({
    description: 'User email',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  email?: string = undefined;

  @ApiPropertyOptional({
    description: 'User phone',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  phone?: string = undefined;
}
