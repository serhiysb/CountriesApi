import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('holiday')
export class HolidayEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  localName: string;

  @Column()
  name: string;

  @Column()
  countryCode: string;

  @ManyToOne(() => UserEntity, (user) => user.holidays)
  user: UserEntity;
}
