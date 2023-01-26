import { ApiProperty } from '@nestjs/swagger';
import { NarrativeCategory, SignificanceLevel } from '@prisma/client';

export class CreateNarrativeDto {
  @ApiProperty()
  academicYearId: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  category: NarrativeCategory;
}
