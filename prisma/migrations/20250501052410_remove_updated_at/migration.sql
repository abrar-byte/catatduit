/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
