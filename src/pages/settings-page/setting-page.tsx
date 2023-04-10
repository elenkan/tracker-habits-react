import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {Tabs} from "@mui/material";
import {Tab} from "@mui/material";
import {Switch} from "@mui/material";
import {ChangeEvent, useState} from 'react';
import "./settings-page.scss"

const SettingPage = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const tabsContent = (value: number) => {
        const showTab = value;
        if (showTab === 0) {
            return (
                <div className="setting__item">
                    <span
                        className="setting-account">Удалить аккаунт</span>
                    <Button
                        className="setting-account__button"
                        sx={{color: "#272727"}}
                        variant="outlined">Удалить</Button>
                </div>
            );
        } else {
            return (
                <div className="setting__item">
                    <span className="setting-theme">Темная тема</span>
                    <Switch/>
                </div>
            );
        }
    }
    return (
        <div>
            <Box component="form"
                 sx={{
                     '& .MuiTextField-root': {m: 1, width: '25ch'},
                     boxShadow: "0 1px 12px -4px #bababa",
                     borderRadius: "10px",
                     width: "400px"
                 }}
                 noValidate
                 autoComplete="off"
                 className="setting">
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