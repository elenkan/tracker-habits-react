import {createReducer} from '@reduxjs/toolkit';
import {
    addHabit,
    changeHabitList,
    changeHabitItem,
    addColorMood,
    addChangeableHabit,
    changeProgressData,
    updateProgressData,
    setAuthStatus, setUserData
} from '../actions/actions';

import {Habit, ProgressItem} from '../types';

type StateType = {
    habitList: Habit[],
    progressData: ProgressItem[],
    colorMood: string,
    changeableHabit: Habit | null,
    isAuth: boolean,
    // TODO: присвоить тип
    userData: any
}

const initialState: StateType = {
    habitList: [],
    progressData: [],
    colorMood: '',
    changeableHabit: null,
    isAuth: false,
    userData: {}
};

const reducer = createReducer(initialState, builder => {
    builder.addCase(addHabit, (state, action) => {
            state.habitList = [...state.habitList, action.payload];
        });

    builder.addCase(changeHabitList, (state, action) => {
        state.habitList = action.payload
    });
//проверить функцию
    builder.addCase(changeHabitItem, (state, action) => {
        state.habitList = action.payload
    });

    builder.addCase(addColorMood, (state, action) => {
        state.colorMood = action.payload
    });

    builder.addCase(addChangeableHabit, (state, action) => {
        state.changeableHabit = action.payload
    });

    builder.addCase(changeProgressData, (state, action) => {
        state.progressData = [...state.progressData, action.payload]
    });

    builder.addCase(updateProgressData, (state, action) => {
        state.progressData = action.payload
    });

    builder.addCase(setAuthStatus, (state, action) => {
        state.isAuth = action.payload
    });

    builder.addCase(setUserData, (state, action) => {
        state.userData = action.payload
    });
});

export {reducer}
