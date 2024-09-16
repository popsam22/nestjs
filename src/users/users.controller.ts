import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './dtos/users.dto';

@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(@Query('role') role?: 'Intern' | 'Admin') {
    return this.usersService.getAllUsers(role);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDTO) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDTO,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
