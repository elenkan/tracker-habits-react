import { useController, Control, RegisterOptions } from "react-hook-form";
import TextField from '@mui/material/TextField';
import {Field} from '../../types';
import fieldsData from './../../fields.json';
import {Fragment} from 'react';

type PropsType = {
  name: string,
  control: Control
}
const FormTextField = ({ name,control }: PropsType) => {
  const data: Field = fieldsData;
  let fieldRules = data[name].rules;

  if (fieldRules.pattern) {
    fieldRules.pattern.value = new RegExp(fieldRules.pattern.value, 'g')
  }

  const {
    field: { onChange, value},
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: { ...fieldRules as Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' >},
  });

  return (
    <Fragment>
      <TextField
        placeholder={data[name].placeholder}
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
        name={name}
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
