import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
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
