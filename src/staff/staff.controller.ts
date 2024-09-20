import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { Prisma } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  create(@Body() createStaffDto: Prisma.UserCreateInput) {
    return this.staffService.create(createStaffDto);
  }

  @SkipThrottle({ default: false }) //rate limit this endpoint.
  @Get()
  findAll(@Query('role') role?: 'Intern' | 'Admin') {
    return this.staffService.findAll(role);
  }

  //override existing rate limit available globally
  @Throttle({ short: { ttl: 2000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaffDto: Prisma.UserUpdateInput,
  ) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
