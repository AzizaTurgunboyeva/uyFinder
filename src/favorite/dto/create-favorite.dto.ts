import { ApiProperty } from "@nestjs/swagger"

export class CreateFavoriteDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  rentallistId: number;
}
