import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
@Get()
@ApiOperation({ summary: 'Get list of users with optional search and role filter' })
  @ApiQuery({ name: 'search', required: false, description: 'Search by name (partial match)' })
  @ApiQuery({ name: 'role', required: false, enum: ['admin', 'editor', 'viewer'], description: 'Filter by role' })
  @ApiResponse({ status: 200, description: 'List of users',  })
 async findAll(
    @Query('search') search?: string,
    @Query('role') role?: 'admin' | 'editor' | 'viewer',
  ) {
    return this.usersService.findAll({ search, role });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }


  @Patch(':id/toggle-active')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle user active status (true ↔ false)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Active status toggled', })
  @ApiResponse({ status: 404, description: 'User not found' })
  async toggleActive(@Param('id') id: string) {
    return this.usersService.toggleActive(id);
  }
}
