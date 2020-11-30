import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

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
