import { User } from '@/app/api/users/route'
import { useFetchUserByName } from '@/hooks/useFetchUserByName'
import { queryClient } from '@/providers/react-query'
import { Autocomplete, TextField, TextFieldProps } from '@mui/material'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

type TextFieldColor = TextFieldProps['color']

type AutocompleteAsyncProps = {
  name: string
  label: string
  color: TextFieldColor
}

export function AutocompleteAsync({
  name,
  label,
  color,
}: AutocompleteAsyncProps) {
  const [user, setUser] = useState<User | null>(null)
  const [inputValue, setInputValue] = useState('')

  const { data, isFetching, refetch } = useFetchUserByName(inputValue)

  const { register } = useFormContext()

  const debounceChangeInputValue = debounce((value: string) => {
    setInputValue((state) => {
      if (state === value) {
        return state
      }
      return value
    })
  }, 1000)

  useEffect(() => {
    if (inputValue) {
      refetch()
    }
  }, [inputValue, refetch])

  return (
    <Autocomplete
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={user}
      options={data}
      loading={isFetching}
      noOptionsText="No person found"
      onChange={(event, newValue) => {
        if (newValue) {
          queryClient.setQueryData(
            ['users', newValue.name],
            [...data, newValue],
          )
        } else {
          queryClient.setQueryData(['users', inputValue], data)
        }
        setUser(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        debounceChangeInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          label={label}
          color={color}
          {...params}
          {...register(name)}
        />
      )}
    />
  )
}
