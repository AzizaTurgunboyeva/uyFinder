/*
  Warnings:

  - Added the required column `is_creator` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "is_creator" BOOLEAN NOT NULL;
