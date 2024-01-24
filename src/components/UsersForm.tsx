'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserFormFields } from './UsersFormFields'

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

  const { handleSubmit } = usersFormMethods

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <FormProvider {...usersFormMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserFormFields />
      </form>
    </FormProvider>
  )
}
