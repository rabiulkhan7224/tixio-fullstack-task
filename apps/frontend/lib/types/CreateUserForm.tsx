'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateUserFormData, createUserSchema } from './userSchema';
import { useCreateUser } from '@/hooks/useCreateUser';



interface CreateUserFormProps {
  onSuccess?: () => void;
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'viewer',
    },
  });

  const { mutate, isPending, error: submitError } = useCreateUser();
  const role = watch('role');

  const onSubmit = (data: CreateUserFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
   
      <div>
        <label htmlFor="name" className="text-sm font-medium mb-2 block">
          Name
        </label>
        <Input
          id="name"
          placeholder="Enter user name"
          disabled={isPending || isSubmitting}
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>


      <div>
        <label htmlFor="email" className="text-sm font-medium mb-2 block">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter user email"
          disabled={isPending || isSubmitting}
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>
      {/* password */}
      <div>
        <label htmlFor="password" className="text-sm font-medium mb-2 block">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter user password"
          disabled={isPending || isSubmitting}
          {...register('password')}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
        )}
      </div>

      
      <div>
        <label htmlFor="role" className="text-sm font-medium mb-2 block">
          Role
        </label>
        <Select
          value={role}
          onValueChange={(value) => setValue('role', value as any)}
          disabled={isPending || isSubmitting}
        >
          <SelectTrigger id="role" className={errors.role ? 'border-destructive' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-destructive mt-1">{errors.role.message}</p>
        )}
      </div>

      
      {submitError && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-3 py-2 rounded-md text-sm">
          {submitError instanceof Error ? submitError.message : 'Failed to create user'}
        </div>
      )}

      <div className="flex gap-3 justify-end pt-4">
        <Button type="submit" disabled={isPending || isSubmitting}>
          {isPending || isSubmitting ? 'Creating...' : 'Create User'}
        </Button>
      </div>
    </form>
  );
}
