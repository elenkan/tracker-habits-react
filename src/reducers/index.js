const initialState = {
    habitList: [],
    colorMood: "",
    changeableHabit: null,
};

const reducer = (state = initialState, action) => {

    if (action.type === "addHabit") {
        return {
            habitList: [...state.habitList, action.habit]
        };
    }

    if (action.type === "changeHabitList") {
        return {
            habitList: action.newList
        };
    }

    if (action.type === "addColorMood") {
        state.colorMood = action.colorMood
    }

    if (action.type === "addChangeableHabit") {
        state.changeableHabit = action.changeableHabit
    }
    return state;
};

export default reducer;