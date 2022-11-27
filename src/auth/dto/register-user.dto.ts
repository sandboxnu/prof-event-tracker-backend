import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
