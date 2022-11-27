import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleOauthModule } from './google/google-auth.module';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, JwtAuthModule, PrismaModule, GoogleOauthModule],
})
export class AuthModule {}
