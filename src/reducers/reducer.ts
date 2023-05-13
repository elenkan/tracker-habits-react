import {createReducer} from '@reduxjs/toolkit';
import {
  addHabit,
  addColorMood,
  addChangeableHabit,
  changeProgressData,
  setAuthStatus,
  setUserData,
  setModeApp,
  addCalendarHabit,
  changeHabitList,
  changeCalendarHabitList
} from '../actions/actions';

import {Habit, ProgressItem} from '../types';

type StateType = {
  challengeHabitsList: Habit[],
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
  challengeHabitsList: [],
  calendarHabitsList: [],
  progressData: [],
  challengeProgressData: [],
  colorMood: '',
  changeableHabit: null,
  isAuth: true,
  mode: 'challenge',
  userData: {}
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(addHabit, (state, action) => {
    state.challengeHabitsList.push(action.payload);
  });

  builder.addCase(changeHabitList, (state, action) => {
    state.challengeHabitsList = action.payload
  });

  builder.addCase(addCalendarHabit, (state, action) => {
    state.calendarHabitsList.push(action.payload);
  });

  builder.addCase(changeCalendarHabitList, (state, action) => {
    state.calendarHabitsList = action.payload
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
