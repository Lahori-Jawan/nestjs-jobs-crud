import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Nasir', description: 'Your first name' })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Khan', description: 'Your last name' })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: 'lahori-jawan', description: 'Your user name' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'P@ssw0rd', description: 'Your ******' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'nasir.h@allshorestaffing.com',
    description: 'Your email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
