import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from '@user/dto/user.create-dto';
import { LoginUserDto } from '@user/dto/user.login-dto';
import { Public } from '../public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Public()
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  // @Get('whoami')
  // public async testAuth(@Req() req: any) {
  //   return req.user;
  // }
}
