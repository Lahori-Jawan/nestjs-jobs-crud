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
import { Status } from './enums';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  title: string;

  @Column({ type: 'varchar', length: 250 })
  companyname: string;

  @Column({ type: 'varchar' })
  description: string;

  @Index()
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.UNLISTED,
  })
  status: string;

  @ManyToMany((type) => User, (user) => user.jobs, { cascade: true })
  @JoinTable({
    name: 'job-applications',
    joinColumn: { referencedColumnName: 'id', name: 'job_id' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'user_id' },
  })
  applications: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
