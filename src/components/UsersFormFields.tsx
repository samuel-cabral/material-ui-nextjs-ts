import {
  Autocomplete,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

export interface User {
  id: number
  name: string
}

export function UserFormFields() {
  const { register } = useFormContext()

  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:3000/api/users')

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      return data.users as User[]
    } catch (error) {
      console.error('There was an error!', error)
      return []
    }
  }

  const {
    data: users,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    initialData: [],
  })

  return (
    <Stack spacing={3} p={8} bgcolor={grey[900]} borderRadius={3} width={500}>
      <Autocomplete
        loading={isLoading !== isFetching ? isFetching : isLoading}
        options={users}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        loadingText="Carregando..."
        noOptionsText="Nenhum usuário encontrado"
        renderInput={(params) => (
          <TextField
            {...register('name')}
            {...params}
            color="success"
            label="Name"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <TextField label="Phone" color="success" {...register('phone')} />

      <TextField label="Email" color="success" {...register('email')} />

      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </Stack>
  )
}
