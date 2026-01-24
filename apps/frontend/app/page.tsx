"use client";
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
import { useState } from "react";

const HomePage = () => {
  const [role, setRole] = useState<string | null>(null);
  
  
  
  const handleRoleChange = (value: string) => {
    setRole(value === "all" ? null : value);
  };

  return (
    <div className="min-h-screen bg-background ">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <Button>Add New User</Button>
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
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
