import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { UpdateSellerDto } from "./dto/update-seller.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateSellerDto } from "./dto";
import * as uuid from "uuid";
import { MailService } from "../mail/mail.service";

@Injectable()
export class SellerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSellerDto: CreateSellerDto) {
    try {
      const candidate = await this.findSellerByEmail(createSellerDto.email);
      if (candidate) {
        throw new BadRequestException("Bunday foydalanuvchi mavjud");
      }
      const { hashedPassword, ...data } = createSellerDto;
      const hashPassword = await bcrypt.hash(hashedPassword, 7);
      const activation_link = uuid.v4();

      const newSeller = await this.prismaService.seller.create({
        data: {
          ...data,
          hashedPassword: hashPassword,
          activation_link: activation_link,
        },
      });

      return newSeller;
    } catch (error) {
      console.log("createAdmin", error);
    }
  }

  findAll() {
    return this.prismaService.seller.findMany();
  }

  async findOne(id: number) {
    const one = await this.prismaService.seller.findUnique({ where: { id } });
    if (!one) {
      throw new NotFoundException("BUnday sotuvchi mavjud emas");
    }
    return one;
  }

  async findSellerByEmail(email: string) {
    const seller = await this.prismaService.seller.findUnique({
      where: { email },
    });
    return seller;
  }

  async update(id: number, updateSellerDto: UpdateSellerDto) {
    try {
      const updated = await this.prismaService.seller.update({
        where: { id },
        data: { ...updateSellerDto },
      });
      return updated;
    } catch (error) {
      console.log("update seller error", error);
    }
  }
  async updateRefreshTokenSeller(id: number, hashToken: string | null) {
    const updateSeller = await this.prismaService.seller.update({
      where: { id },
      data: { hashToken },
    });
    return updateSeller;
  }
  remove(id: number) {
    this.findOne(id);
    return this.prismaService.seller.delete({ where: { id } });
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const seller = await this.prismaService.seller.findFirst({
      where: { activation_link: link },
    });

    if (!seller) {
      throw new BadRequestException("Invalid activation link");
    }

    if (seller.is_active) {
      throw new BadRequestException("seller already activated");
    }

    const updatedSeller = await this.prismaService.seller.update({
      where: { id: seller.id },
      data: { is_active: true },
    });

    return {
      message: "seller activated successfully",
      seller: updatedSeller.is_active,
    };
  }
 
}
