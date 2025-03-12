import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalListDto } from './create-rental-list.dto';
import { Decimal } from '@prisma/client/runtime/library';

export class UpdateRentalListDto {
    
      sellerId?: number;
      districtId?: number;
      address?: string;
      rent?: Decimal;
      description?: string;
      accommodationType?: string;
      furnished?: boolean;
      amenitiesId?: number;
      categoryId?: number;
      location?: string;
      nearUniversityId?: number;
      type?: string;
}
