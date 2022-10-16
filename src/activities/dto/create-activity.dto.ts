import { ApiProperty } from '@nestjs/swagger';
import {ActivityCategory, SignificanceLevel } from '@prisma/client';



export class CreateActivityDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    academicYearId: string;

    @ApiProperty()
    date: string;


    @ApiProperty()
    name: boolean;

    @ApiProperty()
    description: string;

    @ApiProperty()
    category: ActivityCategory;

    @ApiProperty()
    significance: SignificanceLevel;

    @ApiProperty()
    isFavorite: boolean;




}
