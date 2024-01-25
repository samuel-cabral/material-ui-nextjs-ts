import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

import { User } from '@/app/api/users/route'

export async function fetchUsersByName(name: string) {
  const { data } = await api.get('/users', {
    params: {
      name,
    },
  })
  return data
}

export function useFetchUserByName(name: string) {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetchUsersByName(name),
    enabled: !!name,
    initialData: [],
  })
}
