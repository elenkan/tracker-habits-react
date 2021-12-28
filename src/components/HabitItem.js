import React from "react";
import {IconButton} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./habit-item.scss";

const HabitItem = (props) => {
    const habit = props.item;
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let color = useSelector(state => state.colorMood);
    let habitList = useSelector(state => state.habitList);

    const daysList = () => {
        const list = new Array(habit.period).fill({color: ""});
        const daysArray = list.map(item => Object.assign({}, item));
        daysArray.forEach(item => {
            item.id = Math.random() * list.length;
        });
        return daysArray;
    };
    const resultList = daysList();
    const [list, setList] = useState(resultList);


    const setData = (item) => {
        const newArr = list.slice();
        const el = newArr.find(el => el.id === item.id);
        if (el.color === "") {
            console.log("inside", color)
            el.color = color;
        } else {
            el.color = "";
        }
        setList(newArr);
        //отображение цвета исправить
        // getProgressValue();
        // getMoodValue();
    };

    const changeHabit = (habit) => {
        dispatch({type: "addChangeableHabit", changeableHabit: habit});
        navigate("/create-habit");
    };
    const deleteHabit = (habitId) => {
        const filterList = habitList.filter(item => item.id !== habitId);
        dispatch({type: "changeHabitList", newList: filterList})
    }

    let dayListItem = list.map(day => {
        return (
            <span className="days-list__item"
                  onClick={() => setData(day)}
                  style={{
                      'backgroundColor': day.color ? day.color : 'transparent',
                      'border': day.color ? '1px solid transparent' : '1px solid #89ccc5'
                  }}
                  key={day.id}>
            </span>
        );
    });

    return (
        <li className="habit-item">
            <div className="habit-item__data">
                <span className="habit-item__name">{habit.name}</span>
                <span className="habit-item__description">{habit.description}</span>
            </div>

            <div className="days-list">
                {dayListItem}
            </div>
            <div className="habit-item__button-group">
                <IconButton onClick={() => changeHabit(habit)}>
                    <CreateIcon/>
                </IconButton>
                <IconButton onClick={() => deleteHabit(habit.id)}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </li>
    )
};

export default HabitItem;