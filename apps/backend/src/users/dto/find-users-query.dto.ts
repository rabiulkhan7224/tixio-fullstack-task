import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export interface PaginatedUsers {
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: Date;
  }[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
export enum UserRole {
  admin = 'admin',
  editor = 'editor',
  viewer = 'viewer',
}

export class FindUsersQueryDto {
  @ApiPropertyOptional({ example: 'rabiul', description: 'Search by name (partial, case-insensitive)' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: UserRole, description: 'Filter by role' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: 1, default: 1, description: 'Page number (starts at 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10, description: 'Items per page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100) 
  limit?: number = 10;
}