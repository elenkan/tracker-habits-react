import {createReducer} from '@reduxjs/toolkit';
import {
  addColorDifficulty,
  addChangeableHabit,
  setAuthStatus,
  changeHabitList,
  setCurrentTheme,
  setIsGuestAuth,
  setUserColorTheme,
} from '../actions/actions';

import type {Habit} from '../types';

interface StateType {
  challengeHabitsList: Habit[];
  colorDifficulty: string;
  changeableHabit: Habit | null;
  isAuth: boolean;
  // TODO: присвоить тип
  userData: any;
  isGuestAuth: boolean;
  currentTheme: 'light' | 'dark';
  userColorTheme: 'light' | 'dark';
}

const initialState: StateType = {
  challengeHabitsList: [],
  colorDifficulty: '',
  changeableHabit: null,
  isAuth: false,
  userData: {},
  isGuestAuth: false,
  currentTheme: 'light',
  userColorTheme: 'light',
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(changeHabitList, (state, action) => {
    state.challengeHabitsList = action.payload;
  });

  builder.addCase(addColorDifficulty, (state, action) => {
    state.colorDifficulty = action.payload;
  });

  builder.addCase(addChangeableHabit, (state, action) => {
    state.changeableHabit = action.payload;
  });

  builder.addCase(setAuthStatus, (state, action) => {
    state.isAuth = action.payload;
  });

  builder.addCase(setCurrentTheme, (state, action) => {
    state.currentTheme = action.payload;
  });

  builder.addCase(setUserColorTheme, (state, action) => {
    state.userColorTheme = action.payload;
  });

  builder.addCase(setIsGuestAuth, (state, action) => {
    state.isGuestAuth = action.payload;
  });
});

export {reducer};
