import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StaffService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createStaffDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createStaffDto,
    });
  }

  async findAll(role?: 'Intern' | 'Admin') {
    if (role)
      return this.databaseService.user.findMany({
        where: { role },
      });
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateStaffDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
