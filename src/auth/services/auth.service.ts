import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '@user/dto/user.create-dto';
import { UserService } from '@user/user.service';
import { LoginUserDto } from '@user/dto/user.login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    let status = {
      success: true,
      message: 'user registered',
      user: null,
    };

    try {
      const newUser = await this.usersService.create(user);
      status.user = newUser;
    } catch (err) {
      status = {
        success: false,
        message: err.message,
        user: null,
      };
    }

    return status;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.loginUser(loginUserDto);

    const accessToken = this._createToken({ id: user.id, email: user.email });

    return {
      user,
      accessToken,
    };
  }

  async validateUser(email: string) {
    const user = await this.usersService.findOne({ email });

    if (!user) throw new UnauthorizedException();

    return user;
  }

  private _createToken(user: any) {
    return this.jwtService.sign(user);
  }
}
