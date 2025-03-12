import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserPreferenceDto } from "./dto/create-user-preference.dto";
import { UpdateUserPreferenceDto } from "./dto/update-user-preference.dto";

@Injectable()
export class UserPreferenceService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserPreferenceDto: CreateUserPreferenceDto) {
    try {
      const add = await this.prismaService.userPreferences.create({
        data: { ...createUserPreferenceDto },
      });
      return add;
    } catch (error) {
      console.log("create userprefrence", error);
    }
  }

  findAll() {
    return this.prismaService.userPreferences.findMany({
      include: { user: { select: { id: true } } },
    });
  }

  async findOne(id: number) {
    const one = await this.prismaService.userPreferences.findUnique({
      where: { id },
    });
    if (!one) {
      throw new NotFoundException("Not found");
    }
    return one;
  }

  async update(id: number, updateUserPreferenceDto: UpdateUserPreferenceDto) {
    try {
      const updated = await this.prismaService.userPreferences.update({
        where: { id },
        data: { ...updateUserPreferenceDto },
      });
      return updated
    } catch (error) {
      console.log("update userpreferense error", error);
    }
  }

  remove(id: number) {
    this.findOne(id)
    return this.prismaService.userPreferences.delete({where:{id}})
  }
}
