/*
  Warnings:

  - You are about to drop the column `latitude` on the `university` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `university` table. All the data in the column will be lost.
  - Added the required column `location` to the `university` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "university" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "location" TEXT NOT NULL;
