import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export default {
  appName: configService.get('NR_APP_NAME'),
  licenseKey: configService.get('NR_LICELSE_KEY'),
};
