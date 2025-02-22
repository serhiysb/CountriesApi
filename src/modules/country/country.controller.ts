import { Controller, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiResponse } from '@nestjs/swagger';
import { CountryDto, CountryInfoDto } from './dto/country.dto';
import { HolidaysRequestDto } from '../user/dto/holidays.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiResponse({ status: 200, type: [CountryDto] })
  async getCountries() {
    return await this.countryService.getCountries();
  }

  @Get(':countryCode')
  @ApiResponse({ status: 200, type: [CountryInfoDto] })
  async getCountryWithData(@Param('countryCode') countryCode: string) {
    return await this.countryService.getCountryWithData(countryCode);
  }
}
