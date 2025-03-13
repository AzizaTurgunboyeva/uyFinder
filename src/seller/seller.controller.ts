import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { SellerService } from './seller.service';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerGuard } from '../guards/seller/seller.guard';
import { JwtAuthGuard } from '../guards/admin/jwt-auth.guard';
import { JwtCreatorGuard } from '../guards/admin/jwt-creator.guard';

@Controller("seller")
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  @Get()
  findAll() {
    return this.sellerService.findAll();
  }
  @UseGuards( SellerGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sellerService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(+id, updateSellerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sellerService.remove(+id);
  }
  @Get("activate/:link")
  activate(@Param("link") link: string) {
    if (!link) {
      throw new BadRequestException("No activation link provided");
    }
    return this.sellerService.activate(link);
  }
 
 
}
