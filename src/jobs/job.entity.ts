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
export class Job extends BaseEntity {
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
    // transformer: {
    //   from: p => p, // comes from database in format we need already,
    //   to: p => convertStringToPoint(p) // serialize "123, 456" -> { x: 123, y: 456 }
    // to: p => `${p.x},${p.y}`, // { x: 1, y: 2 } -> '1,2'
    // }
  })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
