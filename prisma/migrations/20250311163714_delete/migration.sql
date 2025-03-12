/*
  Warnings:

  - You are about to drop the column `seller_id` on the `image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_seller_id_fkey";

-- AlterTable
ALTER TABLE "image" DROP COLUMN "seller_id";
