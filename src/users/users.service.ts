import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dtos/users.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Naomi Ayinla',
      email: 'nayinla01@gmail.com',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'Ayodeji Olamide',
      email: 'ayomatt@gmail.com',
      role: 'Admin',
    },
    {
      id: 3,
      name: 'Favour Okafor',
      email: 'okafor@gmail.com',
      role: 'Intern',
    },
    {
      id: 4,
      name: 'Mike Akapo',
      email: 'bigmike@gmail.com',
      role: 'Intern',
    },
    {
      id: 5,
      name: 'Ada Obi',
      email: 'adaobi@gmail.com',
      role: 'Intern',
    },
  ];

  getAllUsers(role?: 'Intern' | 'Admin') {
    if (role) {
      const roles = this.users.filter((user) => user.role === role);
      if (roles.length === 0)
        throw new NotFoundException('Role does not exist');
      return this.users;
    }
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  createUser(createUserDto: CreateUserDTO) {
    this.users.push(createUserDto);
    return createUserDto;
  }

  updateUser(id: number, updateUserDto: UpdateUserDTO) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.getUser(id);
  }

  deleteUser(id: number) {
    const deletedUser = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return deletedUser;
  }
}
