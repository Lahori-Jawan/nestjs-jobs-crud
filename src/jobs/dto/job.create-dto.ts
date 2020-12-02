import { IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from '../enums';

export class CreateJobDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  companyname: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  status: Status;

  // @IsNotEmpty()
  // location: string;
}
