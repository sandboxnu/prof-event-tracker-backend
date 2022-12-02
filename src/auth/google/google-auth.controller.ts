import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GoogleOauthGuard } from './google-auth.guard';

@Controller('auth/google')
@ApiTags('google-oauth')
export class GoogleOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req: Request) {
    // Guard redirects
  }

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const { accessToken } = await this.jwtAuthService.signIn(req.user);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.redirect('/protected');
  }
}
