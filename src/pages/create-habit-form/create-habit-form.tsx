import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {ButtonGroup} from "@mui/material";
import "./create-habbit-form.scss";
import {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {addChangeableHabit, addHabit, changeHabitList} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import {Habit} from '../../types';

const CreateHabitForm = () => {
    const changeableHabit = useAppSelector(state => state.changeableHabit);
    const habitsList = useAppSelector(state => state.habitList);
    const dispatch = useAppDispatch();
    let countDays = 0;
    let navigate = useNavigate();

    const [name, setName] = useState<string>(!!changeableHabit ? changeableHabit.name : "");
    const [description, setDescription] = useState<string>(!!changeableHabit ? changeableHabit.description : "");

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    //задать дефолтное значение
    const buttons = [
        <Button key="21" className="habit-form__button" onClick={() => countDays = 21}>21 день</Button>,
        <Button key="30" className="habit-form__button" onClick={() => countDays = 30}>30 дней</Button>,
    ];
    const saveHabit = () => {
        const habit = {
            name: name,
            description: description,
            id: changeableHabit ? changeableHabit.id : Math.random() * 2 * Math.random(),
            period: countDays
        };

        if (changeableHabit) {
            const list = habitsList.map(item => Object.assign({},item));
            let listElement= list.find(item => item.id === changeableHabit.id) ?? {name: '', description: ''};
            listElement.name = habit.name
            listElement.description = habit.description

            dispatch(changeHabitList(list))
            dispatch(addChangeableHabit(null));
            navigate("/habits-list");
        } else {
            dispatch(addHabit(habit))
            setName("");
            setDescription("");
        }
    };

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
                value={name}
                onChange={handleChangeName}
                sx={{
                    borderColor: "#89ccc5",
                }}/>
            <TextField
                className="habit-form__item outlined"
                placeholder="Описание"
                value={description}
                onChange={handleChangeDescription}
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
                    onClick={saveHabit}
                    variant="outlined">Сохранить</Button>
            </div>
        </Box>
    );
};

export default CreateHabitForm;