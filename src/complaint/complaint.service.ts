import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateComplaintDto, UpdateComplaintDto } from "./dto";

@Injectable()
export class ComplaintService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createComplaintDto: CreateComplaintDto) {
    try {
      return this.prismaService.complaint.create({
        data: {
          userId: createComplaintDto.userId,
          rentallistId: createComplaintDto.rentallistId,
          reason: createComplaintDto.reason,
          isSolved: createComplaintDto.is_solved,
        },
      });
    } catch (error) {
      console.log("create error", error);
    }
  }

  findAll() {
    return this.prismaService.complaint.findMany({
      include: { rentallist: true, user: { select: { id: true } } },
    });
  }

  async findOne(id: number) {
    const complaint = await this.prismaService.complaint.findUnique({
      where: { id },
    });
    if (!complaint) {
      throw new NotFoundException("Bunday shikoyat mavjud emas");
    }
    return complaint;
  }

  async update(id: number, updateComplaintDto: UpdateComplaintDto) {
    try {
      const updated = await this.prismaService.complaint.update({
        where: { id },
        data: { ...updateComplaintDto },
      });
      return updated;
    } catch (error) {
      console.log("update error", error);
    }
  }

  remove(id: number) {
    return this.prismaService.complaint.delete({ where: { id } });
  }
}
