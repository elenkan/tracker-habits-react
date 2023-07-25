import Box from '@mui/material/Box';
import {Button, Tabs, Tab, Switch, Typography} from '@mui/material';
import {ChangeEvent, useState} from 'react';
import './settings-page.scss'
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {setCurrentTheme} from '../../actions/actions';


const SettingPage = () => {
  const [value, setValue] = useState(0);
  const currentTheme = useAppSelector(state => state.currentTheme);
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeSwitch = () => {
    dispatch(setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light'))
  };

  const tabsContent = (value: number) => {
    const showTab = value;
    if (showTab === 0) {
      return (
        <div className="setting__item">
          <Typography
            component="span"
            color="text.primary">
            Удалить аккаунт
          </Typography>
          <Button
            variant="outlined">Удалить</Button>
        </div>
      );
    } else {
      return (
        <div className="setting__item">
          <Typography
            component="span"
            color="text.primary">
            Темная тема
          </Typography>
          <Switch onChange={handleChangeSwitch}/>
        </div>
      );
    }
  }
  return (
    <div className="setting">
      <Box component="form"
           sx={{
             '& .MuiTextField-root': {m: 1, width: '25ch'},
             boxShadow: '0 1px 12px -4px #bababa',
             borderRadius: '10px',
             width: '400px',
             minHeight: '300px',
             fontSize:'20px',
             lineHeight: '28px',
             bgcolor: 'background.default'
           }}
           noValidate
           autoComplete="off">
        <Tabs value={value}
              variant="fullWidth"
              onChange={handleChange}>
          <Tab label="Аккаунт"/>
          <Tab label="Темы"/>
        </Tabs>
        {tabsContent(value)}
      </Box>
    </div>);
}

export default SettingPage;