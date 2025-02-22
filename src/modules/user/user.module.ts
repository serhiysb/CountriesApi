import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidayEntity } from 'src/entities/holiday.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([HolidayEntity, UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
