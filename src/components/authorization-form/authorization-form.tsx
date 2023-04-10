import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import {InputAdornment, IconButton} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Box} from '@mui/material';
import './authorization-form.scss';
import {store} from '../../store';
import { login,createLogin } from '../../actions/api-actions';

const AuthorizationForm = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickOpen = (type: string) => () => {
        setOpen(true);
        setType(type)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClickButton = () => {
        if (type === 'signup') {
            store.dispatch(createLogin({name, email, password}))
        } else {
            store.dispatch(login({email, password}))
        }
        setOpen(false);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="auth">
            <Button sx={{color: '#fff', fontFamily: '"Raleway-Bold",Arial,sans-serif'}}
                    onClick={handleClickOpen('signup')}>Регистрация</Button>
            <Button sx={{color: '#fff', fontFamily: '"Raleway-Bold",Arial,sans-serif'}}
                    onClick={handleClickOpen('signin')}>Войти</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    borderRadius: '10px'
                }}
            >
                <DialogContent>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        className="auth-form"
                        sx={{
                            m: 'auto'
                        }}>
                        <Button variant="outlined"
                                className="auth_form__item"
                                sx={{
                                    color: '#272727',
                                    width: '180px',
                                    margin: '0 auto',
                                }}>
                            Войти как гость</Button>
                        <span className="auth-form__divider">Или</span>
                        {type === 'signup' &&
                        <TextField
                            className="auth_form__item"
                            placeholder="Имя"
                            value={name}
                            size="small"
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                width: '250px',
                                margin: '0 auto 20px auto'
                            }}/>}
                        <TextField
                            className="auth_form__item"
                            placeholder="Email"
                            value={email}
                            size="small"
                            margin="normal"
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                width: '250px',
                                margin: '0 auto 20px auto'
                            }}/>
                        <TextField
                            className="auth_form__item"
                            placeholder="Password"
                            value={password}
                            size="small"
                            margin="normal"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                width: '250px',
                                margin: '0 auto 40px auto'
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}/>

                        <Button
                            sx={{
                                backgroundColor: '#e2958c',
                                borderColor: '#e2958c',
                                color: '#fff',
                                width: '300px',
                                margin: '0 auto',
                                ':hover': {
                                    backgroundColor: 'rgba(226,149,140, 0.9)',
                                    borderColor: '#e2958c'

                                }
                            }}
                            variant="outlined"
                            onClick={onClickButton}
                        >{type === 'signup' ? 'Зарегистрироваться' : 'Войти'}</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AuthorizationForm