import {
  Controller,
  Body,
  Get,
  Post,
  BadRequestException,
  Param,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/job.create-dto';
import { UpdateJobDto } from './dto/job.update-dto';
import { FilterJobDto } from './dto/job.filter-dto';
import { isLatLong } from 'class-validator';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getAllJobs(@Query() filter: FilterJobDto) {
    return await this.jobsService.getAll(filter);
  }

  @Get(':id')
  async getJob(@Param('id') id: number) {
    return await this.jobsService.getOne(id);
  }

  @Post()
  async createJob(@Body() job: CreateJobDto) {
    console.log({ job });
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
    console.log({ message, affected });
    return {
      message,
      updatedJob: !affected ? null : updatedJob,
    };
  }
}
