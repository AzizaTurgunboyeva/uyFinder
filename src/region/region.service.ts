import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prismaService:PrismaService){}
  create(createRegionDto: CreateRegionDto) {
    return this.prismaService.region.create({
      data: { name: createRegionDto.name },
    });
  }

  findAll() {
    return this.prismaService.region.findMany()
  }

  async findOne(id: number) {
    const region = await this.prismaService.region.findUnique({where:{id}})
    if(!region){
      throw new NotFoundException("Bunday viloyat mavjud emas")
    }
    return region
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const updated = await this.prismaService.region.update({
      where: { id },
      data: { ...updateRegionDto },
    });
    return updated
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prismaService.region.delete({where:{id}})
  }
}
