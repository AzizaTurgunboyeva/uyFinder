import { ApiProperty } from "@nestjs/swagger";
import { Usertype } from "@prisma/client";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  firstName: string;
  @IsString()
  @ApiProperty()
  lastName: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsPhoneNumber()
  @ApiProperty()
  phone: string;
  @ApiProperty()
  hashToken?: string;
  is_active?:boolean
  @ApiProperty()
  userType: Usertype;
  @ApiProperty()
  hashedPassword: string;
}
