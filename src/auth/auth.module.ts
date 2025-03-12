import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';
import { SellerModule } from '../seller/seller.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    AdminModule,
    UserModule,
    SellerModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: "MySecretKey",
      signOptions: { expiresIn: "15h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
