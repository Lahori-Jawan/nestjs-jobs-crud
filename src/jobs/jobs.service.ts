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
import { FilterJobDto } from './dto/job.filter-dto';

const validStatus = ['listed', 'unlisted', 'saved'];
@Injectable()
export class JobsService {
  constructor(@InjectRepository(Job) private jobsRepository: Repository<Job>) {}

  async getAll(filter: FilterJobDto) {
    // Should have pagination for better performance
    return await this.jobsRepository.find({
      where: { ...filter },
      relations: ['applications'],
    });
  }
  // locations: (31.585323, 74.473126), (31.584369, 74.473148), (31.583208, 74.472473), (31.583235, 74.474002), (31.580580, 74.473417)
  // (31.587270, 74.472296), (31.588047, 74.471363)
  async create(job: CreateJobDto) {
    const [x, y] = job.location.split(',');
    const location = `point(${x} ${y})`;
    let newJob = null;

    job.status = validStatus.includes(job.status) ? job.status : 'unlisted';

    try {
      // await this.jobsRepository.save(newJob); // not saving location accurately
      newJob = await this.jobsRepository
        .query(`INSERT INTO jobs("title", "companyname", "description", "status", "location")
      VALUES('${job.title}', '${job.companyname}','${job.description}', '${job.status}', '${location}')
      RETURNING *`);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return newJob;
  }

  async getOne(id: number) {
    const job = await this.jobsRepository.findOne({
      where: { id },
      relations: ['applications'],
    });

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

  async jobApplication(id: number, user: any) {
    const job = await this.jobsRepository.findOne({
      where: { id },
      relations: ['applications'],
    });

    if (!job) throw new NotFoundException('This job is not available');

    job.applications.push(user);
    await this.jobsRepository.save(job);

    return job;
  }

  async nearByJobs(
    column: string = 'title',
    value: any = 'A job title 13',
    radius: number = 500, // unit in meters
  ) {
    console.log({ column, value });
    return await this.jobsRepository.query(
      `select *, ST_DISTANCE(d.location::geography, ref.location::geography) as distance from jobs d, lateral( select id, location from jobs where ${column}='${value}' ) as ref where d.id <> ref.id and ST_DISTANCE(d.location::geography, ref.location::geography) < ${radius}  order by distance`,
    );
  }
}
