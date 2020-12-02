import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ type: 'varchar', length: 200, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 200, unique: true })
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
  async emailToLowerCase() {
    let pwd = this.password;
    const salt = bcrypt.genSalt(10);
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
    console.log(
      'password',
      this.password,
      `result ${bcrypt.compareSync(pwd, this.password)}`,
    );
  }
}
