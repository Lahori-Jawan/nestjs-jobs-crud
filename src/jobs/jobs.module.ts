import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './jobs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobsService],
  controllers: [JobsController],
})
export class JobsModule {}
