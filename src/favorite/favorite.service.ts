import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { UpdateFavoriteDto } from "./dto/update-favorite.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createFavoriteDto: CreateFavoriteDto) {
    try {
      const favorite = await this.prismaService.favorite.create({
        data: { ...createFavoriteDto },
      });
      return favorite;
    } catch (error) {
      console.log("createFavorite error", error);
    }
  }

  findAll() {
    return this.prismaService.favorite.findMany({
      include: {
        user: { select: { id: true } },
        rentallist: { select: { id: true } },
      },
    });
  }

  async findOne(id: number) {
    const favorite = await this.prismaService.favorite.findUnique({
      where: { id },
    });
    if (!favorite) {
      throw new NotFoundException("BUnday idli yoqtirishlar mavjud emas");
    }
    return favorite;
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    try {
      const updated = await this.prismaService.favorite.update({
        where: { id },
        data: { ...updateFavoriteDto },
      });
      return updated
    } catch (error) {
      console.log("updatefavorite",error);
      
    }
  }

  remove(id: number) {
    this.findOne(id);
    return this.prismaService.favorite.delete({ where: { id } });
  }
}
