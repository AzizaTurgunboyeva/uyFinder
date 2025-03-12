import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAmenityDto, UpdateAmenityDto } from './dto';

@Injectable()
export class AmenityService {
  constructor(private readonly prismaService:PrismaService){}
  async create(createAmenityDto: CreateAmenityDto) {
    try {
      const amenity= await this.prismaService.amenity.create({data:{...createAmenityDto}})
      return amenity
    } catch (error) {
      console.log("create error");
      
    }
  }

  findAll() {
    return this.prismaService.amenity.findMany()
  }

  async findOne(id: number) {

    const amenity=await this.prismaService.amenity.findUnique({where:{id}})
    if(!amenity){
      throw new NotFoundException("Bunday ma'lumot mavjud emas")
    }
    return amenity
  }

  async update(id: number, updateAmenityDto: UpdateAmenityDto) {
   const updated =await this.prismaService.amenity.update({where:{id},data:{...updateAmenityDto}})
   return updated
  }

  remove(id: number) {
    this.findOne(id)
    return this.prismaService.amenity.delete({where:{id}})
  }
}
