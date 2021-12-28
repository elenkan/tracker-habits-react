import React from "react";
import MoodList from "./MoodList";
import HabitItem from "./HabitItem";
import {useSelector} from "react-redux";

const HabitsList = () => {
    const habitList = useSelector(state => state.habitList)
    const list = habitList.map(item => {
        return <HabitItem item={item} key={item.id}/>
    })
    return (
        <div>
            {list}
            <MoodList/>
        </div>
    )
};


export default HabitsList;