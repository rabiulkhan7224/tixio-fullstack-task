'use client';

import { createUser } from '@/lib/api';
import { CreateUserPayload, User } from '@/lib/types/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserPayload) => {
      return createUser(payload);
    },
    onSuccess: (newUser: User) => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Optionally cache the new user
      queryClient.setQueryData(['user', newUser.id], newUser);
    },
  });
}
