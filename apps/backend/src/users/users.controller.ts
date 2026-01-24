import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  
   async createuser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get()
  @ApiOperation({
    summary: 'Get paginated list of users with search & role filter',
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: ['admin', 'editor', 'viewer'],
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'sort', required: false, enum: ['asc', 'desc'] })

  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Paginated users' })
  
  async getallUsers(@Query() query: FindUsersQueryDto) {
    return this.usersService.getallUsers(query);
  }
  @ApiOperation({ summary: 'get a single user by ID' })
  @ApiParam({ name: 'id', description: 'user ID ' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  getUserbyId(@Param('id') id: string) {
    return this.usersService.getUserbyId(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUserbyId(@Param('id') id: string) {
    return this.usersService.deleteUserbyId(id);
  }

  @Patch(':id/toggle-active')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle user active status (true ↔ false)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Active status toggled' })
  @ApiResponse({ status: 404, description: 'User not found' })


  async toggleActive(@Param('id') id: string) {
    return this.usersService.toggleActive(id);
  }
}
