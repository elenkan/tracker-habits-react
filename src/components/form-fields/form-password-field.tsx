import {useController} from 'react-hook-form';
import type {Control} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {IconButton, InputAdornment} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useState} from 'react';
import type {FormData} from '../../types';

interface PropsType {
  control: Control<FormData>;
  keyDownAction: () => void;
}
const FormPasswordField = ({control, keyDownAction}: PropsType) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController({
    name: 'password',
    control,
    rules: {
      required: {
        value: true,
        message: 'Обязательное поле',
      },
      minLength: {
        value: 6,
        message: 'Минимальная длина 6 символов',
      },
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      placeholder="Password"
      value={value}
      size="small"
      margin="normal"
      name="password"
      type={showPassword ? 'text' : 'password'}
      error={!!error}
      helperText={error?.message}
      autoComplete="on"
      FormHelperTextProps={{
        sx: {
          position: 'absolute',
          top: '36px',
        },
      }}
      onChange={onChange}
      sx={{
        width: '280px',
        position: 'relative',
        margin: '0 auto 40px auto',
      }}
      InputProps={{
        onKeyDown(event) {
          if (event.code === 'Enter') {
            keyDownAction();
          }
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
              {showPassword ? (
                <Visibility
                  sx={{
                    '@media (max-width: 600px)': {
                      width: '20px',
                    },
                  }}
                />
              ) : (
                <VisibilityOff
                  sx={{
                    '@media (max-width: 600px)': {
                      width: '20px',
                    },
                  }}
                />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FormPasswordField;
