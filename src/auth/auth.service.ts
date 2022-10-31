import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';



@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async signIn(userDto: RegisterUserDto) {
    // TODO make a DTO for the user
    if (!userDto) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.prisma.user.findFirst({ where: {email: userDto.email}});

    if (!userExists) {
      return this.registerUser(userDto);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,

    });
  }

  async registerUser(userDto: RegisterUserDto) {
    const newUser = await this.prisma.user.create({ data: userDto });
    this.generateJwt({sub: newUser.id, email: newUser.email});

  }
}

class JwtPayload {
    sub: number;
    email: string;
}
