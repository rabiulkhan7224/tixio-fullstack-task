'use client';

import { getUser } from '@/lib/api';
import { User } from '@/lib/types/users';
import { useQuery } from '@tanstack/react-query';

export function useUser(userId: string | null) {
  return useQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      return getUser(userId);
    },
    enabled: !!userId,
  });
}
