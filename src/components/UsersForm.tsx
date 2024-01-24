'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { User, UserFormFields } from './UsersFormFields'

const schema = z.object({
  name: z.string(),
  phone: z.string().min(10).max(11),
  email: z.string().email(),
})

type FormData = z.infer<typeof schema>

export function UsersForm() {
  const usersFormMethods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
    resolver: zodResolver(schema),
  })

  const queryClient = useQueryClient()

  const { handleSubmit } = usersFormMethods

  const usersQueryData = queryClient.getQueryData<User[]>(['users'])

  const onSubmit = (data: FormData) => {
    const foundUser = usersQueryData?.find((user) => user.name === data.name)
    const userId = foundUser?.id
    console.log({
      pessoa: userId,
      telefone: data.phone,
      email: data.email,
    })
  }

  return (
    <FormProvider {...usersFormMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserFormFields />
      </form>
    </FormProvider>
  )
}
