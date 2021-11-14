import React, {useState} from "react";
import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import {IconButton} from "@mui/material";
import {Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {ListItem} from "@mui/material";
import {List} from "@mui/material";
import {Drawer} from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = [
        {path: "/progress", label: "Прогресс"},
        {path: "/create-habit", label: "Создать привычку"},
        {path: "/habits-list", label: "Зачекать привычку"},
        {path: "/settings", label: "Настройки"},
        {path: "", label: "Выйти"}];
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };
    const listItems = menuItems.map(item => (
        <ListItem button key={item.label} onClick={toggleDrawer(false)}>
            <Link to={item.path}
                  style={{ display: "block",
                      textDecoration: "none",
                      fontFamily: '"Montserrat-Regular", Arial, sans-serif',
                      fontSize: ".8125rem",
                      lineHeight: "1rem",
                      color: "#272727" }}>{ item.label }</Link>
        </ListItem>
    ));

    return (
        <AppBar position="absolute"
                sx={{backgroundColor: "#89ccc5",
                zIndex:"10"}}>
            <Toolbar variant="dense">
                <IconButton
                    onClick={toggleDrawer(true)}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}>
                    <MenuIcon/>
                </IconButton>
                <Drawer
                    sx={{
                        position: "relative",
                        zIndex: "9"
                    }}
                    anchor="left"
                    open={isOpen}
                    onClose={toggleDrawer(false)}>
                    <List sx={{
                        width: "256px",
                        marginTop: "40px"
                    }}>
                        {listItems}
                    </List>
                </Drawer>
                <Typography
                    className="header__title"
                    sx={{
                        fontFamily: '"Raleway-Bold", Arial, sans-serif',
                        fontSize: '20px',
                        lineHeight: '28px',
                        color: '#272727'
                    }}
                    component="div">
                    Трекер Привычек
                </Typography>
            </Toolbar>
        </AppBar>);
}


export default Header;