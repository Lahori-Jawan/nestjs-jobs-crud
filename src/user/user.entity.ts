import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Job } from '@src/jobs/jobs.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  firstname: string;

  @Column({ type: 'varchar', length: 200 })
  lastname: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 200, unique: true })
  username: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column()
  password: string;

  @ManyToMany((type) => Job, (job) => job.applications)
  jobs: Job[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    delete this.password;
    return this;
  }

  @BeforeInsert()
  async essentialDataSetup() {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
  }
}
