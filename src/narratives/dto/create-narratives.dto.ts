import { ApiProperty } from '@nestjs/swagger';
import { NarrativeCategory, SignificanceLevel } from '@prisma/client';

export class CreateNarrativesDto {
  @ApiProperty()
  academicYearId: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  category: NarrativeCategory;
}
