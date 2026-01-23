import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}
export class CreateUserDto {
  @ApiProperty({
    example: 'rabiul@example.com',
    description: 'Unique email address',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  //   default role is USER
  @ApiProperty({
    example: 'viewer',
    description: 'role of the viewer',
    required: false,
    enum: Role,
    default: Role.VIEWER,
  })


  @IsOptional()

  role?: Role;

  @ApiProperty({
    example: 'StrongP@ss123',
    minLength: 8,
    description: 'User password',
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({ example: 'Md Rabiul', description: 'Full name of the user' })
  @IsNotEmpty()
  name: string;
}



export class UserResponseDto {
  id: string;
  email: string;
  name: string | null;
  
}