import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Status } from '../enums';

export class UpdateJobDto {
  @ApiPropertyOptional({
    example: 'Backend Developer',
    description: 'It is the main heading of a job posting.',
  })
  @IsOptional()
  title: string;

  @ApiPropertyOptional({
    example: 'Allshore pvt ltd.',
    description: 'The name of the company that is posting a job.',
  })
  @IsOptional()
  companyname: string;

  @ApiPropertyOptional({
    example:
      'We are currently looking for a developer specializing in nodejs related technologies i.e. Typescript, NPM etc.',
    description:
      'The job requirements in details including some specific and/or generic technologies i.e. Nestjs, Socket.io, GraphQL etc.',
  })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    example: 'saved',
    description:
      'It indicates whether job is <code>listed</code>, <code>unlisted</code> or <code>saved</code> with default value as <code>unlisted</code>.',
  })
  @IsOptional()
  status: Status;

  // @ApiPropertyOptional({
  //   example: '33.729418, 73.038711',
  //   description:
  //     "A cartesian coordinate system based geolocation points representing company's location.",
  // })
  // @IsOptional()
  // location: string;
}
