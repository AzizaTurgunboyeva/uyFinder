import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createBookingDto: CreateBookingDto) {
    try {
      const booking = await this.prismaService.booking.create({
        data: { ...createBookingDto },
      });
      return booking;
    } catch (error) {
      console.log("create error", error);
    }
  }

  findAll() {
    return this.prismaService.booking.findMany({
      include: { rentalList: true, users: { select: { id: true } } },
    });
  }

  async findOne(id: number) {
    const booking = await this.prismaService.booking.findUnique({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException(
        "Bunday idli band qilingan ijara mavjud emas"
      );
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    try {
       const updated = await this.prismaService.booking.update({
         where: { id },
         data: { ...updateBookingDto },
       });
       return updated
    } catch (error) {
      console.log("updateBooking error",error);
      
    }
   
  }

  remove(id: number) {
    this.findOne(id)
    return this.prismaService.booking.delete({where:{id}})
  }
}
