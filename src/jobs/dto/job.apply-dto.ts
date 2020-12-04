import { ApiProperty } from '@nestjs/swagger';
import { isDefined, isNotEmpty } from 'class-validator';

export class ApplyJobDto {
  @ApiProperty({ example: 1 })
  jobId: number;
}
