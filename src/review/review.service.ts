import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto, UpdateReviewDto } from "./dto";

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = await this.prismaService.review.create({
        data: { ...createReviewDto },
      });
      return review;
    } catch (error) {
      console.log("createReview error", error);
    }
  }

  findAll() {
    return this.prismaService.review.findMany({
      include: { users: { select: { id: true } }, rentallist: true },
    });
  }

  async findOne(id: number) {

    const one= await this.prismaService.review.findUnique({ where: { id } });
    if(!one){
      throw new NotFoundException("Bunday review topilmadi")
    }
    return one
  }
  findHome(id: number) {
    return this.prismaService.review.findUnique({
      where: { id },
      include: { rentallist: { select: { id: true } } },
    });
  }
  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const updated = await this.prismaService.review.update({
        where: { id },
        data: { ...updateReviewDto },
      });
      return updated;
    } catch (error) {
      console.log("update review error", error);
    }
  }

  remove(id: number) {
    this.findOne(id)
    return this.prismaService.review.delete({where:{id}})
  }
}
