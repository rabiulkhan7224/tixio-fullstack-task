import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { FindUsersQueryDto, PaginatedUsers } from './dto/find-users-query.dto';

interface FindAllOptions {
  search?: string;
  role?: 'admin' | 'editor' | 'viewer';
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, password, name } = createUserDto;

    // 1. Check for existing user with same email
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const created = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,     
        createdAt: true,
      },
    });

    
    return created;
    
  }

async findAll(query: FindUsersQueryDto): Promise<PaginatedUsers> {
    const { search, role, page = 1, limit = 10 } = query;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
      
    }

    if (role) {
      where.role = role;
    }

    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      this.prisma.user.count({ where }),

      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          active: true,
          createdAt: true,
          // updatedAt: true, // optional
        },
        orderBy: { createdAt: 'desc' }, // or by id, name, etc.
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async findOne(id: string): Promise<UserResponseDto> {   
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    /**
     * Optional: check exists first
     *  */ 
    await this.findOne(id); // reuses logic & throws 404 if missing

    const data: any = { ...updateUserDto };

    // If password update is allowed here (usually better in separate endpoint!)
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return updated;
  }

  async remove(id: string) {
   
    // check exists first
    await this.findOne(id); 

    const deleted = await this.prisma.user.delete({
      where: { id },
      select: { id: true, email: true },
    });

    return { message: 'User deleted successfully', data: deleted };
  }



  // TOGGLE active STATUS
  async toggleActive(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { active: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        active: !user.active,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updated;
  }



}