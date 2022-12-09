import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActivityCategory, SignificanceLevel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('activities')
@ApiTags('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  /**
   * Create an Activity for the user making the request with the given body
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(req.user.sub, createActivityDto);
  }

  /**
   * Get a list of all of the activities for a user. The default user is
   * the user making the request. If an alternate user is provided, then
   * the user making the request must have permissions above FACULTY
   * @param userId? alternate user to list all activities for
   * @param category? filter for only activities in this category
   * @param significance? filter for only activities with this
   */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  findAll(
    @Req() req: any,
    @Query('userId') userId?: string | undefined,
    @Query('category') category?: ActivityCategory | undefined,
    @Query('significance') significance?: SignificanceLevel | undefined,
  ) {
    return this.activitiesService.findFilter(
      req.user.sub,
      userId,
      category,
      significance,
    );
  }

  /**
   * Get the Activity with the given ID. User making request must either
   * be the user associated with the Activity, or have permissions higher than
   * FACULTY
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.activitiesService.findOne(req.user.sub, +id);
  }

  /**
   * Update the Activity with the given ID using the given body. User making request
   * must be the user associated with the Activity.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(req.user.sub, +id, updateActivityDto);
  }

  /**
   * Delete the Activity with the given ID. User making request
   * must be the user associated with the Activity.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: any, @Param('id') id: string) {
    return this.activitiesService.remove(req.user.sub, +id);
  }
}
