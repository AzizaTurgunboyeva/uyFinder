import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";
import { IsString } from "class-validator";

export class CreateUserPreferenceDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  rentMin: Decimal;
  @ApiProperty()
  rentMax: Decimal;
  @ApiProperty()
  @IsString()
  accommodationType: string;
  @ApiProperty()
  @IsString()
  preferredLocation: string;
  @ApiProperty()
  furnished: boolean;
  @ApiProperty()
  @IsString()
  roomType: string;
  @ApiProperty()
  distanceTo: number;
  @ApiProperty()
  @IsString()
  nearTransportation: string;
}
