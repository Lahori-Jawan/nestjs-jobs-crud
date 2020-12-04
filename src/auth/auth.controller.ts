import {
  Controller,
  Body,
  Post,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from '@user/dto/user.create-dto';
import { LoginUserDto } from '@user/dto/user.login-dto';
import { Public } from '../public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);
    console.log({ result });
    if (!result.success) {
      const message = result.message.includes('duplicate')
        ? 'It seems you are registered with these credentials already.'
        : result.message;
      throw new BadRequestException(message);
    }

    return result;
  }

  @HttpCode(200)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  // @Get('whoami')
  // public async testAuth(@Req() req: any) {
  //   return req.user;
  // }
}
