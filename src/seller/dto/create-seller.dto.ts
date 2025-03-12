import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateSellerDto {
  @IsString()
  @ApiProperty()
  fullname: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  phone: string;
  @IsString()
  @ApiProperty()
  hashedPassword: string;
  @ApiProperty()
  image: string;
  @IsOptional()
  hashToken?: string|null
}
