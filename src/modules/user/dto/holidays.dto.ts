import { ApiProperty } from '@nestjs/swagger';
import { HolidayEntity } from 'src/entities/holiday.entity';

export class HolidaysRequestDto {
  @ApiProperty({ example: 'UA' })
  countryCode: string;
  @ApiProperty({ example: 1991 })
  year: number;
  @ApiProperty({ example: ["New Year's Day"] })
  holidays: string[];
}

export class HolidayDto extends HolidayEntity {}
