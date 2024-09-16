import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(@Query('role') role?: 'Intern' | 'Admin') {
    return this.usersService.getAllUsers(role);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(+id);
  }

  @Post()
  createUser(
    @Body()
    user: {
      id: number;
      name: string;
      email: string;
      role: 'Intern' | 'Admin';
    },
  ) {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body()
    user: {
      id?: number;
      name?: string;
      email?: string;
      role?: 'Intern' | 'Admin';
    },
  ) {
    return this.usersService.updateUser(+id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
