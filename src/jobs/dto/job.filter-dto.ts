import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Status } from '../enums';

export class FilterJobDto {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  title: boolean;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  companyname: boolean;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  description: boolean;

  @ApiPropertyOptional({ type: 'enum', enum: ['listed', 'unlisted', 'saved'] })
  @IsOptional()
  status: Status;

  // @ApiPropertyOptional({ type: 'string' })
  // @IsOptional()
  // location: string;
}
