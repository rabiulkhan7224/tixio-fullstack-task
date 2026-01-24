'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleUserActive } from '@/lib/api';
import { User } from '@/lib/types/users';

export function useToggleUserActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return toggleUserActive(userId);
    },
    onMutate: async (userId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['users'] });
      await queryClient.cancelQueries({ queryKey: ['user', userId] });

      // Snapshot previous values
      const previousUsers = queryClient.getQueryData(['users']);
      const previousUser = queryClient.getQueryData<User>(['user', userId]);

      // Optimistic update for users list
      queryClient.setQueriesData(
        { queryKey: ['users'] },
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((u: User) =>
              u.id === userId ? { ...u, active: !u.active } : u
            ),
          };
        }
      );

      // Optimistic update for single user
      if (previousUser) {
        queryClient.setQueryData(['user', userId], {
          ...previousUser,
          active: !previousUser.active,
        });
      }

      return { previousUsers, previousUser };
    },
    onError: (error, userId, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
      if (context?.previousUser) {
        queryClient.setQueryData(['user', userId], context.previousUser);
      }
    },
    onSuccess: (data, userId) => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.setQueryData(['user', userId], data);
    },
  });
}
