import { ApiProperty } from '@nestjs/swagger';
import { BorderDto } from './border.dto';
import { PopulationDto } from './population.dto';

export class CountryDto {
  @ApiProperty({ example: 'UA', description: 'Code of country' })
  countryCode: string;
  @ApiProperty({ example: 'Ukraine', description: 'Name of country' })
  name: string;
}

export class CountryInfoDto extends CountryDto {
  @ApiProperty({ type: [BorderDto], description: 'Borders of country' })
  borders: BorderDto[];

  @ApiProperty({
    type: [PopulationDto],
    description: 'Population of country',
  })
  population: PopulationDto[];

  @ApiProperty({ type: String, description: 'Flag of country' })
  flag: string;
}
