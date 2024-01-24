'use client'
import { Autocomplete, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface AutocompleteFieldProps {
  name: string
  label: string
  options: any[]
}

export function AutocompleteField({
  name,
  label,
  options,
  ...rest
}: AutocompleteFieldProps) {
  const { control, register } = useFormContext()

  return (
    <Controller
      {...register(name)}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label={label} variant="outlined" {...rest} />
          )}
        />
      )}
    />
  )
}
