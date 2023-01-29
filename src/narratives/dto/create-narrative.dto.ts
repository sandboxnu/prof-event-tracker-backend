import { ApiProperty } from '@nestjs/swagger';
import { NarrativeCategory } from '@prisma/client';

export class CreateNarrativeDto {
  @ApiProperty()
  year: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  category: NarrativeCategory;
}
