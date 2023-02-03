import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get env(): string {
    return String(this.configService.get<string>('app.env'));
  }

  get jwtSecret(): string {
    return String(this.configService.get<string>('app.jwtSecret'));
  }

  get jwtExpirationTime(): string {
    return String(this.configService.get<string>('app.jwtExpirationTime'));
  }

  get jwtRefreshSecret(): string {
    return String(this.configService.get<string>('app.jwtRefreshSecret'));
  }

  get jwtRefreshExpirationTime(): string {
    return String(
      this.configService.get<string>('app.jwtRefreshExpirationTime'),
    );
  }
}
