'use client';

import { useUsers } from '@/hooks/useUsers';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { UsersQuery } from '@/lib/types/users';
import { UserListItem } from './UserListItem';

interface UserListProps {
  query: UsersQuery;
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export function UserList({ query, selectedUserId, onSelectUser }: UserListProps) {
  const { data, isLoading } = useUsers(query);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-muted-foreground text-sm">No users found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-1 pr-4">
          {data.data.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              isSelected={user.id === selectedUserId}
              onSelect={onSelectUser}
            />
          ))}
        </div>
      </ScrollArea>

      {data.meta.totalPages > 1 && (
        <div className="flex gap-2 justify-center pt-4">
          <p className="text-xs text-muted-foreground">
            Page {data.meta.page} of {data.meta.totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
