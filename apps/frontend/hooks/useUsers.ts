"use client"

import { getUsers } from "@/lib/api"
import { UsersQuery } from "@/lib/types/users"
import { useQuery } from "@tanstack/react-query"

export function useUsers(query:UsersQuery){ {

return useQuery({
    queryKey:["users",query.search, query.page, query.limit, query.role, query.sort],
    queryFn: async () => getUsers(query),
})

}
}
