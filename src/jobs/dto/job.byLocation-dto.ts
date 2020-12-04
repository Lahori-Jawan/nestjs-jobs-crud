import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class NearbyJobsDTO {
  @ApiProperty({
    example: 'Nodejs Developer',
    description: 'It is the main heading of a job posting.',
  })
  @IsNotEmpty()
  @ValidateIf((o) => !o.location || o.title)
  title: string;

  @ApiProperty({
    example: '31.584600, 74.383356',
    description:
      "A cartesian coordinate system based geolocation points representing company's location.",
  })
  @IsNotEmpty()
  @ValidateIf((o) => !o.title || o.location)
  location: string;

  @ApiProperty({
    example: '500',
    description: 'Radius to look in for jobs',
  })
  @IsNotEmpty()
  radius: number;
}
