import { ApiProperty } from '@nestjs/swagger';
import {ActivityCategory, SignificanceLevel } from '@prisma/client';

export class CreateActivityDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    academicYearId: number;

    @ApiProperty()
    date: Date;

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
