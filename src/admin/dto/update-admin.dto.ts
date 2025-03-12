import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdminDto {
  @ApiProperty()
  fullname?: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  hashToken?: string;
}
