import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { Status } from './enums';
import { IPoint } from './interface';

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

  @Index({ spatial: true })
  @Column({
    type: 'point',
  })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
