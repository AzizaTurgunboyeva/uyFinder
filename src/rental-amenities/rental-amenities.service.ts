import { Injectable } from "@nestjs/common";
import { CreateRentalAmenityDto } from "./dto/create-rental-amenity.dto";
import { UpdateRentalAmenityDto } from "./dto/update-rental-amenity.dto";
import { PrismaService } from "../prisma/prisma.service";
import { connect } from "http2";

@Injectable()
export class RentalAmenitiesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createRentalAmenityDto: CreateRentalAmenityDto) {
    try {
      const rentalamenities = await this.prismaService.rentalAmenities.create({
        data: {
          rentalList: { connect: { id: createRentalAmenityDto.rentallistId } },
          amenity: { connect: { id: createRentalAmenityDto.amenityId } },
        },
      });
      return rentalamenities;
    } catch (error) {
      console.log("create rentalamenities error", error);
    }
  }

  findAll() {
    return this.prismaService.rentalAmenities.findMany({
      include: { rentalList: true, amenity: true },
    });
  }

 

}
