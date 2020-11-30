import { IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  companyname: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  location: string;
}
