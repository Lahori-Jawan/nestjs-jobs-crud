import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '@user/dto/user.create-dto';
import { UserService } from '@user/user.service';
import { LoginUserDto } from '@user/dto/user.login-dto';
import { UserDto } from '@user/dto/user.dto';
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
      const newU = await this.usersService.create(user);
      status.user = newU;
      console.log({ newU });
    } catch (err) {
      status = {
        success: false,
        message: err,
        user: null,
      };
    }

    return status;
  }

  async login(loginUserDto: LoginUserDto) {
    // find user in db
    console.log({ loginUserDto });
    const user = await this.usersService.loginUser(loginUserDto);

    // generate and sign token
    const token = this._createToken({ id: user.id });

    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(email: string) {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      // throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      throw new UnauthorizedException();
    }
    return user;
  }

  private _createToken(user: any) {
    const expiresIn = process.env.EXPIRES_IN;
    const accessToken = this.jwtService.sign(user);

    return {
      expiresIn,
      accessToken,
    };
  }
}
