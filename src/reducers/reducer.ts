import {createReducer} from '@reduxjs/toolkit';
import {
    addHabit,
    changeHabitList,
    changeHabitItem,
    addColorMood,
    addChangeableHabit,
    changeProgressData,
    updateProgressData,
    setAuthStatus,
    setUserData,
    setModeApp
} from '../actions/actions';

import {Habit, ProgressItem} from '../types';

type StateType = {
    habitList: Habit[],
    progressData: ProgressItem[],
    challengeProgressData: ProgressItem[],
    calendarHabitsList: Habit[],
    colorMood: string,
    changeableHabit: Habit | null,
    isAuth: boolean,
    mode: string,
    // TODO: присвоить тип
    userData: any
}

const initialState: StateType = {
    habitList: [],
    calendarHabitsList: [],
    progressData: [],
    challengeProgressData: [],
    colorMood: '',
    changeableHabit: null,
    isAuth: false,
    mode: 'challenge',
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

    builder.addCase(setModeApp, (state, action) => {
        state.mode = action.payload
    });
});

export {reducer}
