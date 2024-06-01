import { useController } from 'react-hook-form'
import type { Control, RegisterOptions } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import type { Field, FormData } from 'shared/types'
import fieldsData from 'shared/ui/form-controls/form-text-field/fields.json'
import { Fragment } from 'react'

interface Props {
  fieldName: 'userName' | 'email' | 'habitName' | 'habitDescription'
  control: Control<FormData>
}
export const FormTextField = ({ fieldName, control }: Props) => {
  const data: Field = fieldsData
  const fieldRules = data[fieldName].rules

  if (fieldRules?.pattern) {
    fieldRules.pattern.value = new RegExp(fieldRules.pattern.value, 'g')
  }

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: fieldName,
    control,
    rules: {
      ...(fieldRules as Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>),
    },
  })

  return (
    <Fragment>
      <TextField
        placeholder={data[fieldName].placeholder}
        size="small"
        helperText={error?.message}
        FormHelperTextProps={{
          sx: {
            position: 'absolute',
            top: '36px',
          },
        }}
        error={!!error}
        onChange={onChange}
        value={value}
        name={fieldName}
        sx={{
          width: '280px',
          position: 'relative',
          margin: '0 auto 25px auto',
        }}
      />
    </Fragment>
  )
}
