import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

const status = ['listed', 'unlisted', 'saved'];

export class CreateJobDto {
  @ApiProperty({
    example: 'Nodejs Developer',
    description: 'It is the main heading of a job posting.',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Datumsquare',
    description: 'The name of the company that is posting a job.',
  })
  @IsNotEmpty()
  companyname: string;

  @ApiProperty({
    example:
      'We are ugently looking for a backend developer specializing in nodejs & its environment i.e. Typescript, NPM etc.',
    description:
      'The job requirements in details including some specific and/or generic technologies i.e. Nestjs, Socket.io, GraphQL etc.',
  })
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    example: 'listed',
    description:
      'It indicates whether job is <code>listed</code>, <code>unlisted</code> or <code>saved</code> with default value as <code>unlisted</code>.',
  })

  @IsDefined()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: '31.584600, 74.383356',
    description:
      "A cartesian coordinate system based geolocation points representing company's location.",
  })
  @IsNotEmpty()
  location: string;
}
