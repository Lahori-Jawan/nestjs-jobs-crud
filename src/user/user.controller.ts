import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private user: UserService) {}

  @Get()
  public async getUsers() {
    return await this.user.findAll();
  }

  // @Post()
  // public async addUser(
  //   @Body('first') fname: string,
  //   @Body('last') lname: string,
  //   @Body('active') isActive: boolean,
  // ) {
  //   return await this.user.add(fname, lname, isActive);
  // }
}
