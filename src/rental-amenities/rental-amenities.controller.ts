import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalAmenitiesService } from './rental-amenities.service';
import { CreateRentalAmenityDto } from './dto/create-rental-amenity.dto';
import { UpdateRentalAmenityDto } from './dto/update-rental-amenity.dto';

@Controller('rental-amenities')
export class RentalAmenitiesController {
  constructor(private readonly rentalAmenitiesService: RentalAmenitiesService) {}

  @Post()
  create(@Body() createRentalAmenityDto: CreateRentalAmenityDto) {
    return this.rentalAmenitiesService.create(createRentalAmenityDto);
  }

  @Get()
  findAll() {
    return this.rentalAmenitiesService.findAll();
  }


}
