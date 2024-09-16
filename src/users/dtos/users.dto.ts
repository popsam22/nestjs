import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateUserDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['Intern', 'Admin'], {
    message: 'Role is not valid',
  })
  role: 'Intern' | 'Admin';
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
