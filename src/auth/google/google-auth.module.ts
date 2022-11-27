import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { GoogleOauthController } from './google-auth.controller';
import { GoogleOauthStrategy } from './google-auth.strategy';

@Module({
  imports: [JwtAuthModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
