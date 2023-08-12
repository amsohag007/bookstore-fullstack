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
import { BooksService } from 'src/books/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from 'src/core/dtos';
import { CreateBookDTO, UpdateBookDTO, BookQueryDTO } from '../dtos';
import { Book } from '../entity';

@Controller('books')
@ApiTags('Book API')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('create')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new book.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Book,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateBookDTO,
    description: 'Data to create new record..',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(@Body() createBookDTO: CreateBookDTO): Promise<ApiResponseDTO<Book>> {
    return await this.booksService.create(createBookDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get book by criteria.' })
  @ApiOkResponse({
    type: Book,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: BookQueryDTO): Promise<ApiResponseDTO<Book[]>> {
    return await this.booksService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get book by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of a book that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: Book,
    description: 'Record has been retrieved successfully.',
    isArray: false,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(@Param('id') id: string): Promise<ApiResponseDTO<Book>> {
    return await this.booksService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update book details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: Book,
  })
  @ApiBody({
    type: UpdateBookDTO,
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

    @Body() updateBookDTO: UpdateBookDTO,
  ): Promise<ApiResponseDTO<Book>> {
    return await this.booksService.update(id, updateBookDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete book.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of book that exists in the database.',
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
    return await this.booksService.remove(id);
  }
}
