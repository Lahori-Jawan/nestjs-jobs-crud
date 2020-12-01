import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';
import { CreateJobDto } from './dto/job.create-dto';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Job) private jobsRepository: Repository<Job>) {}

  async create(job: CreateJobDto) {
    const newJob = new Job();
    Object.assign(newJob, { ...job, location: `(${job.location})` });

    try {
      await this.jobsRepository.save(newJob);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return newJob;
  }
}
