export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface UpdateUserPayload {
  email?: string;
  name?: string;
  role?: UserRole;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UsersQuery {
  search?: string;
  page: number;
  limit: number;
  role?: UserRole;
  sort?: 'asc' | 'desc';
}
