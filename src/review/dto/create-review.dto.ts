import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateReviewDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  homeId: number;
  @ApiProperty()
  rating: number;
  @IsString()
  @ApiProperty()
  comment: string;
}
