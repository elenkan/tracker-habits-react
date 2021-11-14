import React from "react";
import lists from "../lists";
import "./mood-list.scss";

const MoodList = () => {
    const list = lists.moodList;
    const colorStyle = (color) => {
        return {
            backgroundColor : color
        }
    }
    const moodListItems = list.map(item => {
        return (
            <li className="mood-list__item" key={item.mood}>
                <span className="mood-list__color" style={colorStyle(item.color)}></span>
                <span className="mood-list__mood">{item.mood}</span>
            </li>
        );
    });
    return (
        <div className="mood">
            <h3 className="mood__title">Настроение:</h3>
            <ul className="mood-list">
                {moodListItems}
            </ul>
        </div>);
};

export default MoodList;