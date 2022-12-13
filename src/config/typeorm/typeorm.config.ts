import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Event } from '../../models/events/entities/event.entity';
import { User } from '../../models/users/entities/user.entity';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PWD'),
  database: configService.get('DB_NAME'),
  entities: [Event, User],
  migrations: ['./src/db/migrations/*{.ts,.js}'],
});
