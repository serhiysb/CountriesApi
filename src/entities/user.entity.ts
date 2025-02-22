import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HolidayEntity } from './holiday.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @ApiProperty({})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({})
  @Column()
  name: string;

  @ApiProperty({})
  @Column()
  email: string;

  @ApiProperty({})
  @OneToMany(() => HolidayEntity, (holiday) => holiday.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  holidays: HolidayEntity[];
}
