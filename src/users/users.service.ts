import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  getUser(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    email: string;
    role: 'Intern' | 'Admin';
  }) {
    this.users.push(user);
    return user;
  }

  updateUser(
    id: number,
    updates: {
      id?: number;
      name?: string;
      email?: string;
      role?: 'Intern' | 'Admin';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updates };
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
