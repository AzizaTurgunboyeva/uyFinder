import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalListService } from './rental-list.service';
import { CreateRentalListDto } from './dto/create-rental-list.dto';
import { UpdateRentalListDto } from './dto/update-rental-list.dto';

@Controller('rental-list')
export class RentalListController {
  constructor(private readonly rentalListService: RentalListService) {}

  @Post()
  create(@Body() createRentalListDto: CreateRentalListDto) {
    return this.rentalListService.create(createRentalListDto);
  }

  @Get()
  findAll() {
    return this.rentalListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalListDto: UpdateRentalListDto) {
    return this.rentalListService.update(+id, updateRentalListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalListService.remove(+id);
  }
}
