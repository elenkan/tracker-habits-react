import {useEffect, useState} from 'react';
import {AppBar, Toolbar, IconButton, Typography, List, ListItem, Drawer} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from 'react-router-dom';
import AuthorizationForm from '../authorization-form';
import {useAppSelector, useAppDispatch} from '../../hooks/stateHooks';
import {logout} from '../../actions/api-actions';
import {setAuthStatus} from '../../actions/actions';
import {AppRouteList} from '../../router/enums';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isAuth = useAppSelector(state => state.isAuth);
  const userData = useAppSelector(state => state.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userData)
  }, [userData])

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
        navigate(AppRouteList.Home)
      })
    }
  }
  const listItems = menuItems.map(item => (
    <ListItem key={item.label} onClick={toggleDrawer}>
      <Link to={item.path}
            onClick={() => logOut(item.label)}
            style={{
              display: 'block',
              textDecoration: 'none',
              fontFamily: '"Montserrat-Regular", Arial, sans-serif',
              fontSize: '.8125rem',
              lineHeight: '1rem',
              color: '#272727'
            }}>{item.label}</Link>
    </ListItem>
  ));

  return (
    <AppBar position="fixed"
            sx={{
              backgroundColor: '#89ccc5',
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
                  lineHeight: '28px',
                  color: '#272727'
                }}
                component="div">
                Трекер Привычек
            </Typography>
        </>}
        {!isAuth && <AuthorizationForm/>}
      </Toolbar>
    </AppBar>);
}

export default Header;