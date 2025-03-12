import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";
import { IsString } from "class-validator";

export class CreateRentalListDto {
  @ApiProperty()
  sellerId: number;
  @ApiProperty()
  districtId: number;
  @IsString()
  @ApiProperty()
  address: string;
  @ApiProperty()
  rent: Decimal;
  @IsString()
  @ApiProperty()
  description: string;
  @IsString()
  @ApiProperty()
  accommodationType: string;
  @ApiProperty()
  furnished: boolean;
  @ApiProperty()
  amenitiesId: number;
  @ApiProperty()
  categoryId: number;
  @IsString()
  @ApiProperty()
  location: string;
  @ApiProperty()
  nearUniversityId: number;
  @IsString()
  @ApiProperty()
  type: string;
}
