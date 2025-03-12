import { IsString } from "class-validator";

export class CreateComplaintDto {
  rentallistId: number;
  userId: number;
  @IsString()
  reason: string;
  is_solved: boolean;
}
