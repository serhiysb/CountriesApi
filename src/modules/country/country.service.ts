import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CountryDto, CountryInfoDto } from './dto/country.dto';
import { BorderDto } from './dto/border.dto';
import { PopulationDto } from './dto/population.dto';

@Injectable()
export class CountryService {
  constructor(private readonly httpService: HttpService) {}

  async getCountries(): Promise<CountryDto[]> {
    try {
      const observableResponse = this.httpService.get(
        `${process.env.API_DATE_NAGER}/AvailableCountries`
      );
      const response = await firstValueFrom(observableResponse);
      return response.data as CountryDto[];
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  async getCountryWithData(countryCode: string) {
    try {
      const observableCountryInfo = this.httpService.get(
        `${process.env.API_DATE_NAGER}/CountryInfo/${countryCode.toUpperCase()}`
      );
      const countryInfo = await firstValueFrom(observableCountryInfo);
      const countryName: string = countryInfo.data.commonName;
      const borders = countryInfo.data.borders as BorderDto[];

      const observablePopulation = this.httpService.post(
        `${process.env.API_COUNTRISNOW_SPACE}/population`,
        { country: countryName.toLowerCase() }
      );
      const populationData = await firstValueFrom(observablePopulation);
      const population = populationData.data.data
        .populationCounts as PopulationDto[];

      const observableFlag = this.httpService.post(
        `${process.env.API_COUNTRISNOW_SPACE}/flag/images`,
        { country: countryName.toLowerCase() }
      );
      const flagData = await firstValueFrom(observableFlag);
      const flag = flagData.data.data.flag;

      return {
        name: countryName,
        flag,
        borders,
        population,
      } as CountryInfoDto;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
}
