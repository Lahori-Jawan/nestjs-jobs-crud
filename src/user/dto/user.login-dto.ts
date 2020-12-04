import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'nasir.h@allshorestaffing.com',
    description: 'Your email',
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'P@ssw0rd', description: 'Your ******' })
  @IsNotEmpty()
  readonly password: string;
}
