import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['admin', 'editor', 'viewer']).catch('viewer'),

  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;