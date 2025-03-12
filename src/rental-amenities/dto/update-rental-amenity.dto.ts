import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalAmenityDto } from './create-rental-amenity.dto';

export class UpdateRentalAmenityDto extends PartialType(CreateRentalAmenityDto) {}
