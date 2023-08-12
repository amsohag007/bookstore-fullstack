import { FieldStatusEnum, Prisma } from '@prisma/client';

export class Book {
  id?: string;
  title: string;
  discountRate: number;
  coverImage: string;
  price: number;

  status?: FieldStatusEnum;
  metaData?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  createdById?: string;
  updatedById?: string;

  orderItems?: Prisma.OrderItemCreateNestedManyWithoutBooksInput;
}
