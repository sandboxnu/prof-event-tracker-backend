import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async signIn(userDto: RegisterUserDto) {
    if (!userDto) {
      throw new BadRequestException('Unauthenticated');
    }

    if(!(userDto.email.split("@")[1] === "husky.neu.edu")) {
      throw new BadRequestException('Must use a NEU Google email');
    }

    var user = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });

    if (!user) {
      user = await this.registerUser(userDto);
    }

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async registerUser(userDto: RegisterUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        email: userDto.email,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
      },
    });
    return newUser;
  }
}
