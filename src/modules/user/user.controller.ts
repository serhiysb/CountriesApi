import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { HolidaysRequestDto } from './dto/holidays.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/calendar/holidays')
  @ApiResponse({ status: 200, type: UserDto })
  async addHolidaysToCalendar(
    @Param('userId') userId: string,
    @Body() data: HolidaysRequestDto
  ) {
    return this.userService.addHolidaysToCalendar(userId, data);
  }
}
