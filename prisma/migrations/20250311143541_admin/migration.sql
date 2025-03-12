-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "seller" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;
