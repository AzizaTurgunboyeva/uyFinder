import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBookingDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  rentalId: number;
  @IsString()
  @ApiProperty()
  startDate: string;
  @IsString()
  @ApiProperty()
  endDate: string;
  @IsString()
  @ApiProperty()
  status: string;
}
