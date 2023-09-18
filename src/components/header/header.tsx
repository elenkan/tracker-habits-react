import {useState} from 'react';
import {AppBar, Toolbar, IconButton, Typography, List, ListItem, Drawer, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import AuthorizationForm from '../authorization-form';
import {useAppSelector, useAppDispatch} from '../../hooks/stateHooks';
import {logout} from '../../actions/api-actions';
import {setAuthStatus, setIsGuestAuth} from '../../actions/actions';
import {AppRouteList} from '../../router/enums';
import ColorMode from '../color-mode';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isAuth = useAppSelector(state => state.isAuth);
  const isGuestAuth = useAppSelector(state => state.isGuestAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {path: '/progress', label: 'Прогресс'},
    {path: '/create-habit', label: 'Создать привычку'},
    {path: '/habits-list', label: 'Зачекать привычку'},
    {path: '/settings', label: 'Настройки'},
    {path: '', label: 'Выйти'}];

  const toggleDrawer = () => {
    // if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')) {
    //     return;
    // }
    setIsOpen(!isOpen);
  };

  const logOut = (label: string) => {
    if (label === 'Выйти') {
      dispatch(logout()).then(res => {
        dispatch(setAuthStatus(false))
        if (isGuestAuth) {
          dispatch(setIsGuestAuth(false))
        }
        localStorage.setItem('checkAuth', 'false')
        navigate(AppRouteList.Home)
      })
    }
  }
  const listItems = menuItems.map(item => (
    <ListItem key={item.label} onClick={toggleDrawer} sx={{color: 'text.primary'}}>
      <Button
        component={RouterLink}
        to={item.path}
        onClick={() => logOut(item.label)}
        sx={{
          fontSize: '14px',
          lineHeight: '16px',
          color: 'text.primary',
          textTransform: 'none',
          paddingBottom: '0px',
          ':hover': {
            backgroundColor: 'transparent'
          }
        }}>
        {item.label}
      </Button>
    </ListItem>
  ));

  return (
    <AppBar position="fixed"
            sx={{
              zIndex: '10'
            }}>
      <Toolbar variant="dense">
        {isAuth &&
        <>
            <IconButton
                onClick={toggleDrawer}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}>
                <MenuIcon/>
            </IconButton>
            <Drawer
                sx={{
                  position: 'relative',
                  zIndex: '9'
                }}
                anchor="left"
                open={isOpen}
                onClose={toggleDrawer}>
                <List sx={{
                  width: '256px',
                  marginTop: '40px'
                }}>
                  {listItems}
                </List>
            </Drawer>
            <Typography
                className="header__title"
                sx={{
                  fontFamily: '"Raleway-Medium", Arial, sans-serif',
                  fontSize: '20px',
                  lineHeight: '28px'
                }}
                component="div">
                Трекер Привычек
            </Typography>
        </>}
        {!isAuth &&
          <>
            <AuthorizationForm/>
            <ColorMode />
          </>}
      </Toolbar>
    </AppBar>);
}

export default Header;