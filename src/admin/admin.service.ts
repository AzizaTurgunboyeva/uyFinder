import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto";

@Injectable()
export class AdminsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const candidate = await this.findadminByEmail(createAdminDto.email);
      if (candidate) {
        throw new BadRequestException("Bunday foydalanuvchi mavjud");
      }
      const { password, ...data } = createAdminDto;
      const hashedPassword = await bcrypt.hash(password, 7);
      const newAdmin = await this.prismaService.admin.create({
        data: { ...data, password: hashedPassword },
      });
      

      return newAdmin
    } catch (error) {
      console.log("createAdmin", error);
    }
  }

  findAll() {
    return this.prismaService.admin.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.admin.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("Admin topilmadi");
    }
    return user;
  }
  async findadminByEmail(email: string) {
    const admin = await this.prismaService.admin.findUnique({where:{email} });
    return admin;
  }

  async updateRefreshToken(id: number, hashToken: string | null) {
    const updateAdmin = await this.prismaService.admin.update({
      where: { id },
      data: { hashToken },
    });
    return updateAdmin;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prismaService.admin.update({
      where: { id },
      data: { ...updateAdminDto },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.admin.delete({ where: { id } });
  }
}
