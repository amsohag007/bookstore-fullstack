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
import { UsersService } from 'src/users/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from 'src/core/dtos';
import { CreateUserDTO, UpdateUserDTO, UserQueryDTO } from '../dtos';
import { User } from '../entity';

@Controller('users')
@ApiTags('User API')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: User,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateUserDTO,
    description: 'Data to create new record..',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(@Body() createUserDTO: CreateUserDTO): Promise<ApiResponseDTO<User>> {
    return await this.usersService.create(createUserDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get user by criteria.' })
  @ApiOkResponse({
    type: User,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: UserQueryDTO): Promise<ApiResponseDTO<User[]>> {
    return await this.usersService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of a user that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: User,
    description: 'Record has been retrieved successfully.',
    isArray: false,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(@Param('id') id: string): Promise<ApiResponseDTO<User>> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: User,
  })
  @ApiBody({
    type: UpdateUserDTO,
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

    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<ApiResponseDTO<User>> {
    return await this.usersService.update(id, updateUserDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of user that exists in the database.',
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
    return await this.usersService.remove(id);
  }
}
