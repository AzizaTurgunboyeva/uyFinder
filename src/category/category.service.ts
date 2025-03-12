import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: { name: createCategoryDto.name },
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  async findOne(id: number) {
   const category= await this.prismaService.category.findUnique({ where: { id } });
   if(!category){
    throw new NotFoundException("Bunday kategoriya mavjud emas")
   }
   return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updated = await this.prismaService.category.update({
      where: { id },
      data: { ...updateCategoryDto },
    });
    return updated
  }

  remove(id: number) {
    this.findOne(id)
    return this.prismaService.category.delete({where:{id}})
  }
}
