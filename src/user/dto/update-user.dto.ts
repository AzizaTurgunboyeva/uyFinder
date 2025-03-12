import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  hashedPassword?: string;
}
