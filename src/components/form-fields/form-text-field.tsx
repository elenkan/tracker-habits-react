import { useController, Control, RegisterOptions } from "react-hook-form";
import TextField from '@mui/material/TextField';
import {Field, AuthFormData} from '../../types';
import fieldsData from './../../fields.json';
import {Fragment} from 'react';

type PropsType = {
  fieldName: 'userName' | 'email',
  control: Control<AuthFormData>
}
const FormTextField = ({ fieldName,control }: PropsType) => {
  const data: Field = fieldsData;
  let fieldRules = data[fieldName].rules;

  if (fieldRules.pattern) {
    fieldRules.pattern.value = new RegExp(fieldRules.pattern.value, 'g')
  }

  const {
    field: { onChange, value},
    fieldState: { error }
  } = useController({
    name: fieldName,
    control,
    rules: { ...fieldRules as Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' >},
  });

  return (
    <Fragment>
      <TextField
        placeholder={data[fieldName].placeholder}
        size="small"
        helperText={error && error.message}
        FormHelperTextProps={{
          sx: {
            position: 'absolute',
            top: '36px'
          }
        }}
        error={ !!error }
        onChange={onChange}
        value={value}
        name={fieldName}
        sx={{
          width: '250px',
          position: 'relative',
          margin: '0 auto 25px auto'
        }}
      />
    </Fragment>
  );
}

export default FormTextField
