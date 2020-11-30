import { Controller, Get } from '@nestjs/common';
import { JobsService } from 'src/jobs/jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getAll() {
    return this.jobsService.create();
  }
}
