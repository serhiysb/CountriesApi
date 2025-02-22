import { ApiProperty } from '@nestjs/swagger';

export class BorderDto {
  @ApiProperty({ example: 'Poland', description: 'Common name of country' })
  commonName: string;

  @ApiProperty({
    example: 'Republic of Poland',
    description: 'Official name of country',
  })
  officialName: string;

  @ApiProperty({ example: 'PL', description: 'Country code' })
  countryCode: string;

  @ApiProperty({ example: 'Europe', description: 'Region of country' })
  region: string;
}
