import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class DistrictService {
  constructor(private readonly prismaService:PrismaService){}
  create(createDistrictDto: CreateDistrictDto) {
    return this.prismaService.district.create({
      data: { name: createDistrictDto.name,
        regionId:createDistrictDto.regionId
       },
    });
  }

  findAll() {
    return this.prismaService.district.findMany({include:{region:true}})
  }

  async findOne(id: number) {
    const district = await this.prismaService.district.findUnique({where:{id}})
    if(!district){
      throw new NotFoundException("Bunday tuman mavjud emas")
    }
    return district
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
        const updated = await this.prismaService.district.update({
          where: { id },
          data: { ...updateDistrictDto },
        });
        return updated;
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prismaService.district.delete({where:{id}})
  }
}
