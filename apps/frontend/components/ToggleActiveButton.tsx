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
      className={isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
      variant="outline"
      size="sm"
    >
      {isPending ? 'Updating...' : isActive ? 'Active' : 'Inactive'}
    </Button>
  );
}
