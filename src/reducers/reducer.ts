import {createReducer} from '@reduxjs/toolkit';
import {
  addHabit,
  addColorMood,
  addChangeableHabit,
  setAuthStatus,
  setUserData,
  changeHabitList,
  setCurrentTheme,
  setIsGuestAuth
} from '../actions/actions';

import {Habit} from '../types';

type StateType = {
  challengeHabitsList: Habit[],
  colorMood: string,
  changeableHabit: Habit | null,
  isAuth: boolean,
  // TODO: присвоить тип
  userData: any,
  isGuestAuth: boolean,
  currentTheme: 'light' | 'dark'
}

const initialState: StateType = {
  challengeHabitsList: [],
  colorMood: '',
  changeableHabit: null,
  isAuth: true,
  userData: {},
  isGuestAuth: false,
  currentTheme: 'light'
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

  builder.addCase(setAuthStatus, (state, action) => {
    state.isAuth = action.payload
  });

  builder.addCase(setUserData, (state, action) => {
    state.userData = action.payload
  });

  builder.addCase(setCurrentTheme, (state, action) => {
    state.currentTheme = action.payload
  });

  builder.addCase(setIsGuestAuth, (state, action) => {
    state.isGuestAuth = action.payload
  });
});

export {reducer}
