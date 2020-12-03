import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Status } from '../enums';

export class CreateJobDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  title: string;

  @IsNotEmpty()
  companyname: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  location: string;
}
