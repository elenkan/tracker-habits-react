import {createReducer} from '@reduxjs/toolkit';
import {
  addColorDifficulty,
  addChangeableHabit,
  setAuthStatus,
  changeHabitList,
  changeArchiveHabitList,
  setCurrentTheme,
  setIsGuestAuth,
  setUserColorTheme,
  setIsLoading,
} from '../actions/actions';

import type {Habit} from '../types';

interface StateType {
  challengeHabitsList: Habit[];
  archiveHabitsList: Habit[];
  colorDifficulty: string;
  changeableHabit: Habit | null;
  isAuth: boolean;
  // TODO: присвоить тип
  userData: any;
  isGuestAuth: boolean;
  currentTheme: 'light' | 'dark';
  userColorTheme: 'light' | 'dark';
  isLoading: boolean;
}

const initialState: StateType = {
  challengeHabitsList: [],
  archiveHabitsList: [],
  colorDifficulty: '',
  changeableHabit: null,
  isAuth: false,
  userData: {},
  isGuestAuth: false,
  currentTheme: 'light',
  userColorTheme: 'light',
  isLoading: false,
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(changeHabitList, (state, action) => {
    state.challengeHabitsList = action.payload;
  });

  builder.addCase(changeArchiveHabitList, (state, action) => {
    state.archiveHabitsList = action.payload;
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

  builder.addCase(setIsLoading, (state, action) => {
    state.isLoading = action.payload;
  });
});

export {reducer};
