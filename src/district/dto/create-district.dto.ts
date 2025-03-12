import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDistrictDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty()
  regionId: number;
}
