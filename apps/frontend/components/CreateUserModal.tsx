'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreateUserForm } from './createUserForm';


export function CreateUserModal() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Create User
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <CreateUserForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
}
