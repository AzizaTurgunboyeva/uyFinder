import { Injectable } from "@nestjs/common";
import { CreateUniversityDto } from "./dto/create-university.dto";
import { UpdateUniversityDto } from "./dto/update-university.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UniversityService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUniversityDto: CreateUniversityDto) {
    try {
      const university = await this.prismaService.university.create({
        data: { ...createUniversityDto },
      });
      return university;
    } catch (error) {
      console.log("createuniversity error", error);
    }
  }

  findAll() {
    return this.prismaService.university.findMany();
  }

  findOne(id: number) {
    return this.prismaService.university.findUnique({ where: { id } });
  }

  async update(id: number, updateUniversityDto: UpdateUniversityDto) {
    try {
      const updated = await this.prismaService.university.update({
        where: { id },
        data: { ...updateUniversityDto },
      });
      return updated
    } catch (error) {
      console.log("update error", error);
    }
  }

  remove(id: number) {
    this.findOne(id)
    return this.prismaService.university.delete({where:{id}})
  }
}
