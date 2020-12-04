import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth('token')
@Controller('users')
export class UserController {
  constructor(private user: UserService) {}

  @Get()
  public async getUsers() {
    return await this.user.findAll();
  }
}
