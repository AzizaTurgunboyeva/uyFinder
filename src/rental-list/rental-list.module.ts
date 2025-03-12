import { Module } from '@nestjs/common';
import { RentalListService } from './rental-list.service';
import { RentalListController } from './rental-list.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [RentalListController],
  providers: [RentalListService],
})
export class RentalListModule {}
