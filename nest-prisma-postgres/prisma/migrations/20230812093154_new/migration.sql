-- CreateEnum
CREATE TYPE "FieldStatusEnum" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "OrderStatusEnum" AS ENUM ('PENDING', 'CANCELED', 'RECEIVED', 'DELIVERED', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "userName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "password" VARCHAR(255),
    "metaData" JSONB DEFAULT '{}',
    "status" "FieldStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdById" UUID,
    "updatedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "discountRate" INTEGER NOT NULL,
    "coverImage" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "metaData" JSONB DEFAULT '{}',
    "status" "FieldStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdById" UUID,
    "updatedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orderStatus" "OrderStatusEnum" NOT NULL DEFAULT 'PENDING',
    "metaData" JSONB DEFAULT '{}',
    "status" "FieldStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdById" UUID,
    "updatedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" UUID NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "metaData" JSONB DEFAULT '{}',
    "status" "FieldStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdById" UUID,
    "updatedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "orderId" UUID,
    "bookId" UUID,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "User_userName_email_idx" ON "User"("userName", "email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
