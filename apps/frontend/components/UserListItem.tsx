'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/lib/types/users';
import { RoleBadge } from './RoleBadge';
import { cn } from '@/lib/utils';

interface UserListItemProps {
  user: User;
  isSelected: boolean;
  onSelect: (userId: string) => void;
}

export function UserListItem({ user, isSelected, onSelect }: UserListItemProps) {
  return (
    <Button
      onClick={() => onSelect(user.id)}
      variant={isSelected ? 'default' : 'ghost'}
      className={cn('w-full justify-start h-auto py-3 px-4 flex flex-col items-start hover:bg-gray-100', isSelected && 'bg-rose-100 text-foreground')}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-medium">{user.name}</span>
        <RoleBadge role={user.role} />
      </div>
      <div className="flex w-full items-center justify-between text-xs mt-2">
        <span className="text-muted-foreground">{user.email}</span>
        <span className={`text-xs font-medium ${user.active ? 'text-green-600' : 'text-gray-500'}`}>
          {user.active ? 'Active' : 'Inactive'}
        </span>
      </div>
    </Button>
  );
}
