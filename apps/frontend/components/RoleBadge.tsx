import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/lib/types/users';


interface RoleBadgeProps {
  role: UserRole;
}

const roleVariants: Record<UserRole, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  admin: 'destructive',
  editor: 'default',
  viewer: 'secondary',
};

export function RoleBadge({ role }: RoleBadgeProps) {
  return <Badge variant={roleVariants[role]}>{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>;
}
