import { useController, Control } from "react-hook-form";
import TextField from '@mui/material/TextField';
import {FormData} from '../../types';
import {Fragment} from 'react';

type PropsType = {
  fieldName: 'weekPeriod',
  control: Control<FormData>,
  minValue: number,
  maxValue: number,
  fieldWidth: string
}
const FormNumberField = ({ fieldName,control, minValue, maxValue, fieldWidth }: PropsType) => {
  const {
    field: { onChange, value},
  } = useController({
    name: fieldName,
    control
  });

  return (
    <Fragment>
      <TextField
        size="small"
        onChange={onChange}
        value={value}
        name={fieldName}
        type="number"
        inputProps={{
          max: maxValue,
          min: minValue
        }}
        sx={{
          maxWidth: fieldWidth
        }}
      />
    </Fragment>
  );
}

export default FormNumberField
