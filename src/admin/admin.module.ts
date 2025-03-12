import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminsService } from './admin.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminModule {}
