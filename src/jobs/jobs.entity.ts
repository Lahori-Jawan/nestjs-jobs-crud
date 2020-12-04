import { User } from '@src/user/user.entity';
import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from './enums';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @ApiProperty({
    example: 'Nodejs Developer',
    description: 'It is the main heading of a job posting.',
    required: true,
  })
  @Column({ type: 'varchar', length: 250 })
  title: string;

  @ApiProperty({
    example: 'Datumsquare',
    description: 'The name of the company that is posting a job.',
    required: true,
  })
  @Column({ type: 'varchar', length: 250 })
  companyname: string;

  @ApiProperty({
    example:
      'We are ugently looking for a backend developer specializing in nodejs & its environment i.e. Typescript, NPM etc.',
    description:
      'The job requirements in details including some specific and/or generic technologies i.e. Nestjs, Socket.io, GraphQL etc.',
    required: true,
  })
  @Column({ type: 'varchar' })
  description: string;

  @ApiPropertyOptional({
    example: 'listed',
    description:
      'It indicates whether job is <code>listed</code>, <code>unlisted</code> or <code>saved</code> with default value as <code>unlisted</code>.',
  })
  @Index()
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.UNLISTED,
  })
  status: string;

  @ApiProperty({
    example: '31.584600, 74.383356',
    description:
      "A cartesian coordinate system based geolocation points representing company's location.",
    required: true,
  })
  @Column({ type: 'geometry', spatialFeatureType: 'point' })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => User, (user) => user.jobs, { cascade: true })
  @JoinTable({
    name: 'job-applications',
    joinColumn: { referencedColumnName: 'id', name: 'job_id' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'user_id' },
  })
  applications: User[];
}
