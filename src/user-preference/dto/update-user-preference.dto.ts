import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPreferenceDto } from './create-user-preference.dto';
import { Decimal } from '@prisma/client/runtime/library';

export class UpdateUserPreferenceDto  {
      userId?: number;
      rentMin?: Decimal;
      rentMax: Decimal;
      accommodationType?: string;
      preferredLocation?: string;
      furnished?: boolean;
      roomType?: string;
      distanceTo?: number;
      nearTransportation?: string;
}
