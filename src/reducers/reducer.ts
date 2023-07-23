import {createReducer} from '@reduxjs/toolkit';
import {
  addHabit,
  addColorMood,
  addChangeableHabit,
  changeProgressData,
  setAuthStatus,
  setUserData,
  changeHabitList
} from '../actions/actions';

import {Habit, ProgressItem} from '../types';

type StateType = {
  challengeHabitsList: Habit[],
  progressData: ProgressItem[],
  challengeProgressData: ProgressItem[],
  colorMood: string,
  changeableHabit: Habit | null,
  isAuth: boolean,
  // TODO: присвоить тип
  userData: any
}

const initialState: StateType = {
  challengeHabitsList: [],
  progressData: [],
  challengeProgressData: [],
  colorMood: '',
  changeableHabit: null,
  isAuth: true,
  userData: {}
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(addHabit, (state, action) => {
    state.challengeHabitsList.push(action.payload);
  });

  builder.addCase(changeHabitList, (state, action) => {
    state.challengeHabitsList = action.payload
  });

  builder.addCase(addColorMood, (state, action) => {
    state.colorMood = action.payload
  });

  builder.addCase(addChangeableHabit, (state, action) => {
    state.changeableHabit = action.payload
  });

  builder.addCase(changeProgressData, (state, action) => {
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
