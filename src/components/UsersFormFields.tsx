import { Button, Stack, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useFormContext } from 'react-hook-form'
import { AutocompleteAsync } from './AutocompleteAsync'
import { UsersFormData } from './UsersForm'

export function UserFormFields() {
  const { register } = useFormContext<UsersFormData>()

  return (
    <Stack spacing={3} p={8} bgcolor={grey[900]} borderRadius={3} width={500}>
      <AutocompleteAsync name="name" label="name" color="success" />
      <TextField label="phone" color="success" {...register('phone')} />
      <TextField label="email" color="success" {...register('email')} />
      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </Stack>
  )
}
