import {
  Controller,
  Body,
  Get,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/job.create-dto';
import { isLatLong } from 'class-validator';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  async createJob(@Body() job: CreateJobDto) {
    const validLocation = isLatLong(job.location);

    if (!validLocation)
      throw new BadRequestException('Please provide correct location.');

    return await this.jobsService.create(job);
  }
}
