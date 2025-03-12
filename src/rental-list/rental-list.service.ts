import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRentalListDto } from "./dto/create-rental-list.dto";
import { UpdateRentalListDto } from "./dto/update-rental-list.dto";
import { PrismaService } from "../prisma/prisma.service";
import { error } from "console";

@Injectable()
export class RentalListService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createRentalListDto: CreateRentalListDto) {
    try {
      const created = await this.prismaService.rentalList.create({
        data: {
          sellerId: createRentalListDto.sellerId,
          districtId: createRentalListDto.districtId,
          address: createRentalListDto.address,
          rent: createRentalListDto.rent,
          description: createRentalListDto.description,
          accommodationType: createRentalListDto.accommodationType,
          furnished: createRentalListDto.furnished,
          categoryId: createRentalListDto.categoryId,
          amenitiesId: createRentalListDto.amenitiesId,
          location: createRentalListDto.location,
          nearUniversityId: createRentalListDto.nearUniversityId,
          type: createRentalListDto.type,
        },
      });
      return created;
    } catch (error) {
      console.log("createrentalList", error);
    }
  }

  async findDistrict(id: number) {
    const one = await this.prismaService.rentalList.findUnique({
      where: { id },
      include: { district: { select: { name: true } } },
    });
    if (!one) {
      throw new NotFoundException("Bunday idli tuman  mavjud emas");
    }
    return one;
  }
  async findUniversity(id: number) {
    const one = await this.prismaService.rentalList.findUnique({
      where: { id },
      include: { nearUniversity: { select: { name: true } } },
    });
    if (!one) {
      throw new NotFoundException("Bunday manzilli univesitet  mavjud emas");
    }
    return one;
  }
  async findAddress(address: string) {
    try {
      const one = await this.prismaService.rentalList.findMany({
        where: { address },
      });
      if (!one) {
        throw new NotFoundException(
          "Bunday manzilli ijaraga oid ma'lumot mavjud emas"
        );
      }
      return one;
    } catch (error) {
      console.error("Manzilni qidirishda xatolik:", error); // Xatolikni loglash
    }
  }
  findAll() {
    return this.prismaService.rentalList.findMany({
      include: { district: true, seller: { select: { id: true } } },
    });
  }

  async findOne(id: number) {
    const one = await this.prismaService.rentalList.findUnique({
      where: { id },
    });
    if (!one) {
      throw new NotFoundException(
        "Bunday idli ijaraga oid ma'lumot mavjud emas"
      );
    }
    return one;
  }

  async update(id: number, updateRentalListDto: UpdateRentalListDto) {
    try {
      const updated = await this.prismaService.rentalList.update({
        where: { id },
        data: { ...updateRentalListDto },
      });
      return updated;
    } catch (error) {}
    console.log("updated rentalList", error);
  }

  remove(id: number) {
    return this.prismaService.rentalList.delete({ where: { id } });
  }
}