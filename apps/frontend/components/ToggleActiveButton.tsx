'use client';

import { Button } from '@/components/ui/button';
import { useToggleUserActive } from '@/hooks/useToggleUserActive';

interface ToggleActiveButtonProps {
  userId: string;
  isActive: boolean;
}

export function ToggleActiveButton({ userId, isActive }: ToggleActiveButtonProps) {
  const { mutate, isPending } = useToggleUserActive();

  const handleToggle = () => {
    mutate(userId);
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant={isActive ? 'default' : 'outline'}
      size="sm"
    >
      {isPending ? 'Updating...' : isActive ? 'Active' : 'Inactive'}
    </Button>
  );
}
