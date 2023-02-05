import { ApiProperty } from '@nestjs/swagger';
import { ActivityCategory, SignificanceLevel, Semester} from '@prisma/client';

export class CreateActivityDto {
  @ApiProperty()
  year: number;

  @ApiProperty()
  semester: Semester[];

  @ApiProperty()
  dateModified: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: ActivityCategory;

  @ApiProperty()
  significance: SignificanceLevel;

  @ApiProperty()
  isFavorite: boolean;
}
