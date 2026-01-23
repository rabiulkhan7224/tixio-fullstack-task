import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';



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

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return users;
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


}