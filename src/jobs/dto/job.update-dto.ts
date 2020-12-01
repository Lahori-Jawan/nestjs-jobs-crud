import { IsOptional } from 'class-validator';
import { Status } from '../enums';

export class UpdateJobDto {
  @IsOptional()
  title: string;

  @IsOptional()
  companyname: string;

  @IsOptional()
  description: string;

  @IsOptional()
  status: Status;

  @IsOptional()
  location: string;
}
