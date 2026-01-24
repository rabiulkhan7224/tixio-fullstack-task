"use client";
import { CreateUserModal } from "@/components/CreateUserModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserList } from "@/components/UserList";
import { useUsers } from "@/hooks/useUsers";
import { UserRole, UsersQuery } from "@/lib/types/users";
import { useCallback, useState } from "react";

const HomePage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [role, setRole] = useState<UserRole | undefined>(undefined);
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState<number>(1);

  const query: UsersQuery = {
    search: search || undefined,
    page,
    limit: 10,
    role,
    // sort,
  };

  const { isLoading } = useUsers(query);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page on search
  }, []);

  const handleRoleChange = (value: string) => {
    setRole(value === 'all' ? undefined : (value as UserRole));
    setPage(1); // Reset to first page on filter change
  };

  const handleSortToggle = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };


  return (
    <div className="min-h-screen bg-background ">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <div className="">
          <CreateUserModal />
            </div>
          </div>
          {/* filter and search section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <Label
                htmlFor="search"
                className="text-sm font-medium mb-2 block"
              >
                Search Users
              </Label>
              <Input
                type="text"
                id="search"
                placeholder="Search by name "
                className=""
              />
            </div>

            <div className="w-full md:w-auto min-w-[180px] ">
              <label className="text-sm font-medium mb-2 block">
                Filter by role
              </label>
              <Select value={role || "all"} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="">Sort by Name</Button>
          </div>
          {/*  Dashboard user data layout  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel - Users List */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Users</h2>
              <UserList
                query={query}
                selectedUserId={selectedUserId}
                onSelectUser={setSelectedUserId}
              />
            </div>
          </div>

          {/* Right Panel - User Details */}
          {/* <div className="md:col-span-2">
            <UserDetails userId={selectedUserId} />
          </div> */}
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
