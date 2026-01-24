'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleBadge } from './RoleBadge';
import { UserSkeleton } from './UserSkeleton';
import { ToggleActiveButton } from './ToggleActiveButton';
import { useUser } from '@/hooks/useUser';
import { useProfileTimer } from '@/hooks/useProfileTimer';

interface UserDetailsProps {
  userId: string | null;
}

export function UserDetails({ userId }: UserDetailsProps) {
  const { data: user, isLoading } = useUser(userId);
  const seconds = useProfileTimer(!!user);

  if (!userId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Select a user to view details</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <UserSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">User not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p className="text-sm">{user.email}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Role</p>
          <div className="mt-1">
            <RoleBadge role={user.role} />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Status</p>
          <p className="text-sm">{user.active ? 'Active' : 'Inactive'}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Viewing profile for</p>
          <p className="text-sm">{seconds} {seconds === 1 ? 'second' : 'seconds'}</p>
        </div>

        <div className="pt-4">
          <ToggleActiveButton userId={user.id} isActive={user.active} />
        </div>
      </CardContent>
    </Card>
  );
}
