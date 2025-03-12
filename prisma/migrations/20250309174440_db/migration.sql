-- CreateEnum
CREATE TYPE "Usertype" AS ENUM ('STUDENT', 'GUEST');

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hashToken" TEXT,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "image" TEXT,
    "hashToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller-activity" (
    "id" SERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "homeId" INTEGER NOT NULL,

    CONSTRAINT "seller-activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaint" (
    "id" SERIAL NOT NULL,
    "rentallistId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "isSolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" SERIAL NOT NULL,
    "regionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental-list" (
    "id" SERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "districtId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "rent" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "accommodationType" TEXT NOT NULL,
    "furnished" BOOLEAN NOT NULL,
    "amenitiesId" INTEGER,
    "categoryId" INTEGER,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "nearUniversityId" INTEGER,

    CONSTRAINT "rental-list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "uploadedBy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "homeId" INTEGER NOT NULL,
    "isMainImage" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rentalamenities" (
    "rentallistId" INTEGER NOT NULL,
    "amenityId" INTEGER NOT NULL,

    CONSTRAINT "rentalamenities_pkey" PRIMARY KEY ("rentallistId","amenityId")
);

-- CreateTable
CREATE TABLE "amenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "includedInRent" BOOLEAN NOT NULL,
    "additionalCost" DECIMAL(65,30),

    CONSTRAINT "amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "rentalId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "homeId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "userType" "Usertype" NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-preferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "rentMin" DECIMAL(65,30),
    "rentMax" DECIMAL(65,30),
    "accommodationType" TEXT,
    "preferredLocation" TEXT,
    "furnished" BOOLEAN,
    "roomType" TEXT,
    "distanceTo" INTEGER,
    "nearTransportation" BOOLEAN NOT NULL,

    CONSTRAINT "user-preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "rentallistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "university_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToRentalList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToRentalList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToRentalList_B_index" ON "_CategoryToRentalList"("B");

-- AddForeignKey
ALTER TABLE "seller-activity" ADD CONSTRAINT "seller-activity_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller-activity" ADD CONSTRAINT "seller-activity_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "rental-list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "complaint_rentallistId_fkey" FOREIGN KEY ("rentallistId") REFERENCES "rental-list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "complaint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental-list" ADD CONSTRAINT "rental-list_nearUniversityId_fkey" FOREIGN KEY ("nearUniversityId") REFERENCES "university"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental-list" ADD CONSTRAINT "rental-list_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental-list" ADD CONSTRAINT "rental-list_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "rental-list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentalamenities" ADD CONSTRAINT "rentalamenities_rentallistId_fkey" FOREIGN KEY ("rentallistId") REFERENCES "rental-list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentalamenities" ADD CONSTRAINT "rentalamenities_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rental-list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "rental-list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-preferences" ADD CONSTRAINT "user-preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_rentallistId_fkey" FOREIGN KEY ("rentallistId") REFERENCES "rental-list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRentalList" ADD CONSTRAINT "_CategoryToRentalList_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRentalList" ADD CONSTRAINT "_CategoryToRentalList_B_fkey" FOREIGN KEY ("B") REFERENCES "rental-list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
