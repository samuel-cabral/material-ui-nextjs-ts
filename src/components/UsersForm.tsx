'use client'
import { User } from '@/app/api/users/route'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserFormFields } from './UsersFormFields'

const schema = z.object({
  name: z.string(),
  phone: z.string().min(10).max(11),
  email: z.string().email(),
})

export type UsersFormData = z.infer<typeof schema>

export function UsersForm() {
  const usersFormMethods = useForm<UsersFormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
    resolver: zodResolver(schema),
  })

  const queryClient = useQueryClient()

  const { handleSubmit } = usersFormMethods

  const onSubmit = (data: UsersFormData) => {
    const name = data.name

    const usersQueryData = queryClient.getQueryData<User[]>(['users', name])

    if (!usersQueryData) {
      return
    }

    const foundUser = usersQueryData.find(
      (user) => user.name.toLowerCase() === data.name.toLowerCase(),
    )
    const userId = foundUser ? foundUser.id : null

    const dataToSubmit = {
      id: userId,
      ...data,
    }

    console.log('🚀 ~ onSubmit ~ dataToSubmit:', dataToSubmit)
  }

  return (
    <FormProvider {...usersFormMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserFormFields />
      </form>
    </FormProvider>
  )
}
