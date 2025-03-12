/*
  Warnings:

  - You are about to drop the column `latitude` on the `rental-list` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `rental-list` table. All the data in the column will be lost.
  - Added the required column `location` to the `rental-list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rental-list" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "location" TEXT NOT NULL;
