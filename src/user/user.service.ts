import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './user.interface';
import { CreateUserDto } from '@user/dto/user.create-dto';
import { LoginUserDto } from '@user/dto/user.login-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const newUser = new User();
    Object.assign(newUser, user);
    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
      throw new Error(error.message);
    }
    return this._sanitizeUser(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(user: IUser): Promise<User | undefined> {
    return this.usersRepository.findOne({ ...user });
  }

  async loginUser(user: LoginUserDto): Promise<User | undefined> {
    const userFound = await this.usersRepository.findOne({ email: user.email });

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const isUserMatched = await bcrypt.compare(
      user.password,
      userFound.password,
    );

    if (!isUserMatched) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this._sanitizeUser(userFound);
  }

  async deleteOne(id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }

  // async updateOne(id: number, user: User) {
  //   return;
  // }

  private _sanitizeUser(user: User) {
    delete user.password;
    return user;
  }
}
