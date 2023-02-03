import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from '../common/guards/localAuth.guard';
import JwtAuthenticationGuard from '../common/guards/jwtAuthentication.guard';
import JwtRefreshGuard from '../common/guards/jwtRefresh.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @Post('log-in')
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;

    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
    );

    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @Post('log-out')
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
    );
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return user;
  }
}
