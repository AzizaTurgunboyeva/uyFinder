import { ApiProperty } from "@nestjs/swagger"

export class CreateRentalAmenityDto {
  @ApiProperty()
  rentallistId: number;
  @ApiProperty()
  amenityId: number;
}
