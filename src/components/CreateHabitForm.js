import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {ButtonGroup} from "@mui/material";
import "./create-habbit-form.scss"

const CreateHabitForm = () => {
    const buttons = [
        <Button key="21" className="habit-form__button">21 день</Button>,
        <Button key="30" className="habit-form__button">30 дней</Button>,
    ];
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
                boxShadow: "0 1px 12px -4px #bababa",
                borderRadius: "10px",
                width: "400px"
            }}
            noValidate
            autoComplete="off"
            className="habit-form">
            <span className="habit-form__title">Создать новую привычку</span>
            <TextField
                className="habit-form__item outlined"
                placeholder="Название привычки"
                sx={{
                    borderColor: "#89ccc5",
                }}/>
            <TextField
                className="habit-form__item outlined"
                placeholder="Описание"
                sx={{
                    borderColor: "#89ccc5",
                }}/>
            <div className="habit-form__period">
                <span>Выбрать период:</span>
                <ButtonGroup variant="text"
                             className="habit-form__buttons-group">
                    {buttons}
                </ButtonGroup>
                <Button
                    className="habit-form__button"
                    sx={{
                        backgroundColor: "#e2958c",
                        borderColor: "#e2958c",
                        color: "#272727"
                    }}
                    variant="outlined">Сохранить</Button>
            </div>
        </Box>
    );
};

export default CreateHabitForm;