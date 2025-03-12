import { ApiProperty } from "@nestjs/swagger";
import { DateTime } from "aws-sdk/clients/devicefarm";
import { IsOptional, IsString } from "class-validator";

export class CreateImageDto {
  @ApiProperty()
  @IsString()
  imageUrl: string;
  homeId: number;
  @ApiProperty()
  @IsOptional()
  isMainImage?: boolean;
}
