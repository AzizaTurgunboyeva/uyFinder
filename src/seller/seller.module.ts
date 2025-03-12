import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[PrismaModule,MailModule],
  controllers: [SellerController],
  providers: [SellerService],
  exports:[SellerService]
})
export class SellerModule {}
