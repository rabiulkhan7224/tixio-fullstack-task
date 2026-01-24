import axios, { AxiosInstance } from "axios";
import { CreateUserPayload, PaginatedResponse, UpdateUserPayload, User, UsersQuery } from "./types/users";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Users API endpoints
export const getUsers = async (query: UsersQuery): Promise<PaginatedResponse<User>> => {
  const { data } = await axiosInstance.get<PaginatedResponse<User>>('/users', {
    params: {
      search: query.search,
      page: query.page,
      limit: query.limit,
      role: query.role,
      sort: query.sort,
    },
  });
  return data;
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  const { data } = await axiosInstance.post<User>('/users', payload);
  return data;
};


export const getUser = async (id: string): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`/users/${id}`);
  return data;
};



export const updateUser = async (id: string, payload: UpdateUserPayload): Promise<User> => {
  const { data } = await axiosInstance.patch<User>(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};

export const toggleUserActive = async (id: string): Promise<User> => {
  const { data } = await axiosInstance.patch<User>(`/users/${id}/toggle-active`);
  return data;
};





export { axiosInstance };