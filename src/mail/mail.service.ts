import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Seller } from "@prisma/client";


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(seller: Seller) {
    const url = `${process.env.API_URL}/seller/activate/${seller.activation_link}`;
    // console.log(url);
    await this.mailerService.sendMail({//mailer o'ziniki kk
      to: seller.email,
      subject: "UyFinder xush kelibsiz",
      template: "./confirm",
      context: {
        name: seller.fullname,
        url,
      },
    });
  }
}
