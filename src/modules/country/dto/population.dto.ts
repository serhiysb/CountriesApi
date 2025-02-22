import { ApiProperty } from '@nestjs/swagger';

export class PopulationDto {
  @ApiProperty({
    example: 1991,
    description: 'Yesr with population of country',
  })
  year: number;

  @ApiProperty({ example: 41000000, description: 'Population of country' })
  value: number;
}
