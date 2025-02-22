import { Injectable } from '@nestjs/common';
import { HolidayDto, HolidaysRequestDto } from './dto/holidays.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { HolidayEntity } from 'src/entities/holiday.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(HolidayEntity)
    private readonly holidayEntity: Repository<HolidayEntity>
  ) {}

  async addHolidaysToCalendar(userId: string, data: HolidaysRequestDto) {
    try {
      const { countryCode, year, holidays } = data;
      const observableHolidays = this.httpService.get(
        `${process.env.API_DATE_NAGER}/PublicHolidays/${year}/${countryCode}`
      );
      const holidaysData = await firstValueFrom(observableHolidays);
      let allHolidays = holidaysData.data as HolidayDto[];

      if (holidays && holidays.length > 0) {
        allHolidays = allHolidays.filter((holiday) =>
          holidays.includes(holiday.name)
        );
      }
      const user = await this.userEntity.findOne({
        where: {
          id: userId,
        },
        relations: ['holidays'],
      });

      await this.holidayEntity.delete({ user: user });

      user.holidays = allHolidays;
      const savedUser: UserDto = await this.userEntity.save(user);

      return savedUser;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
}
