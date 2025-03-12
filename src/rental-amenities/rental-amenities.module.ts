import { Module } from '@nestjs/common';
import { RentalAmenitiesService } from './rental-amenities.service';
import { RentalAmenitiesController } from './rental-amenities.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [RentalAmenitiesController],
  providers: [RentalAmenitiesService],
})
export class RentalAmenitiesModule {}
