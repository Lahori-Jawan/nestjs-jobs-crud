import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

const status = ['listed', 'unlisted', 'saved'];

export class CreateJobDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  title: string;

  @IsNotEmpty()
  companyname: string;

  @IsNotEmpty()
  description: string;

  @IsDefined()
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  location: string;
}
