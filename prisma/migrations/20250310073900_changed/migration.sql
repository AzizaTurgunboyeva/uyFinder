/*
  Warnings:

  - Added the required column `updatedAt` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `district` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `rental-list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `rental-list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `seller-activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `university` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "amenity" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "district" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "image" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "region" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "rental-list" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "seller-activity" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "university" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user-preferences" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
