import { ApiProperty } from "@nestjs/swagger"
import { Decimal } from "@prisma/client/runtime/library"
import { IsString } from "class-validator"

export class CreateAmenityDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty()
  includedInRent: boolean;
  @ApiProperty()
  additionalCost: Decimal;
}
