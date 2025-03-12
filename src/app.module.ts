import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module";
import { SellerModule } from "./seller/seller.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { FavoriteModule } from "./favorite/favorite.module";
import { ReviewModule } from "./review/review.module";
import { BookingModule } from "./booking/booking.module";
import { CategoryModule } from "./category/category.module";
import { RegionModule } from "./region/region.module";
import { DistrictModule } from "./district/district.module";
import { ComplaintModule } from "./complaint/complaint.module";
import { RentalListModule } from "./rental-list/rental-list.module";
import { ImageModule } from "./image/image.module";
import { RentalAmenitiesModule } from "./rental-amenities/rental-amenities.module";
import { AmenityModule } from "./amenity/amenity.module";
import { UserPreferenceModule } from "./user-preference/user-preference.module";
import { UniversityModule } from "./university/university.module";
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    AdminModule,
    SellerModule,
    UserModule,
    PrismaModule,
    AuthModule,
    FavoriteModule,
    ReviewModule,
    BookingModule,
    CategoryModule,
    RegionModule,
    DistrictModule,
    ComplaintModule,
    RentalListModule,
    ImageModule,
    RentalAmenitiesModule,
    AmenityModule,
    UserPreferenceModule,
    UniversityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
