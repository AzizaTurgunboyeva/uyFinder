import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { Usertype } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      const candidate = await this.findByUser(createUserDto.email);
      if (candidate) {
        throw new BadRequestException("Bunday foydalanuvchi mavjud");
      }
      const { hashedPassword, userType, ...data } = createUserDto;
      const hashPassword = await bcrypt.hash(hashedPassword, 7);
      if (userType == Usertype.STUDENT) {
        const student = await this.prismaService.user.create({
          data: {
            ...data,
            hashedPassword: hashPassword,
            userType: Usertype.STUDENT,
          },
        });
        return student;
      } else if (userType == Usertype.GUEST) {
        const guest = await this.prismaService.user.create({
          data: {
            ...data,
            hashedPassword: hashPassword,
            userType: Usertype.GUEST,
          },
        });
        return guest;
      } else {
        throw new BadRequestException("Noma'lum foydalanuvchi turi");
      }
    } catch (error) {
      console.log("create error", error);
    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }
  async findByUser(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user;
  }
  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User topilmadi");
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updated = await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  async updateRefreshToken(id: number, hashToken: string | null) {
    const updateUser = await this.prismaService.user.update({
      where: { id },
      data: { hashToken },
    });
    return updateUser;
  }
  async remove(id: number) {
    await this.findOne(id)
    return this.prismaService.user.delete({ where: { id } });
  }
}
