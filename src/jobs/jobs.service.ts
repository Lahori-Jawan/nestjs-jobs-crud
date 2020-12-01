import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';
import { CreateJobDto } from './dto/job.create-dto';
import { UpdateJobDto } from './dto/job.update-dto';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Job) private jobsRepository: Repository<Job>) {}

  async getAll() {
    //* Should have pagination for better performance
    return await this.jobsRepository.find();
  }

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

  async getOne(id: number) {
    const job = await this.jobsRepository.findOne({ id });

    if (!job) throw new NotFoundException();

    return job;
  }

  async deleteOne(id: number) {
    const result = await this.jobsRepository.delete(id);

    return result;
  }

  async updateOne(id: number, job: UpdateJobDto) {
    let updatedJob = null,
      affected = null;

    try {
      ({ affected } = await this.jobsRepository.update({ id }, job));
      updatedJob = await this.jobsRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(
        'Something went wrong. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { affected, updatedJob };
  }
}
