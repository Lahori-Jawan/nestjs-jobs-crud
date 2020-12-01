import { IsOptional } from 'class-validator';
import { Status } from '../enums';

export class FilterJobDto {
  @IsOptional()
  title: boolean;

  @IsOptional()
  companyname: boolean;

  @IsOptional()
  description: boolean;

  @IsOptional()
  status: Status;

  @IsOptional()
  location: string;
}
