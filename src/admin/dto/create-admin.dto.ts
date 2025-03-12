import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateAdminDto {
  @IsString()
  @ApiProperty()
  fullname: string;
  @IsPhoneNumber()
  @ApiProperty()
  phone: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  is_creator: boolean;
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  hashToken?: string | undefined;
}
