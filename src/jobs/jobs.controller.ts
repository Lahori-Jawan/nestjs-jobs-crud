import {
  Body,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Query,
  Controller,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { isLatLong } from 'class-validator';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/job.create-dto';
import { UpdateJobDto } from './dto/job.update-dto';
import { FilterJobDto } from './dto/job.filter-dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplyJobDto } from './dto/job.apply-dto';
import { NearbyJobsDTO } from './dto/job.byLocation-dto';

@ApiTags('Jobs')
@ApiBearerAuth('token')
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getAllJobs(@Query() filter: FilterJobDto) {
    return await this.jobsService.getAll(filter);
  }

  @Get('bylocation')
  @ApiBody({ type: NearbyJobsDTO })
  async getJobsByLocation(@Body() body: NearbyJobsDTO) {
    const column = 'title' in body ? 'title' : 'location';
    const value =
      column === 'title'
        ? body.title
        : `point(${body.location.split(',')[0]} ${
            body.location.split(',')[1]
          })`;
    return await this.jobsService.nearByJobs(column, value, body.radius);
  }

  @Get(':id')
  async getJob(@Param('id') id: number) {
    return await this.jobsService.getOne(id);
  }

  @Post()
  async createJob(@Body() job: CreateJobDto) {
    const validLocation = isLatLong(job.location);

    if (!validLocation)
      throw new BadRequestException('Please provide correct location.');

    return await this.jobsService.create(job);
  }

  @Delete(':id')
  async removeJob(@Param('id') id: number) {
    const { affected } = await this.jobsService.deleteOne(id);

    const message =
      affected == 0
        ? 'Nothing removed'
        : `Removed ${affected} record ${affected > 1 ? 's' : ''}`;

    return { message };
  }

  @Put(':id')
  async updateJob(@Param('id') id: string, @Body() job: UpdateJobDto) {
    const { affected, updatedJob } = await this.jobsService.updateOne(
      Number(id),
      job,
    );

    const message =
      affected == 0
        ? 'Nothing updated'
        : `Updated ${affected} record ${affected > 1 ? 's' : ''}`;

    return {
      message,
      updatedJob: !affected ? null : updatedJob,
    };
  }

  @Post('apply')
  async applyToJob(@Body() job: ApplyJobDto, @Req() req: any) {

    return await this.jobsService.jobApplication(job.jobId, req.user);
  }
}
