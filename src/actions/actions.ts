import {createAction} from '@reduxjs/toolkit';

export const changeHabitList = createAction('changeHabitList', list => ({payload: list}));
export const addColorMood = createAction('addColorMood', colorMood => ({payload: colorMood}));
export const addChangeableHabit = createAction('addChangeableHabit', changeableHabit => ({payload: changeableHabit}));
export const setAuthStatus = createAction('setAuthStatus', value => ({payload: value}));
export const setUserData = createAction('setUserData', value => ({payload: value}));
export const setCurrentTheme = createAction('setCurrentTheme', value => ({payload: value}))
export const setIsGuestAuth = createAction('setIsGuestAuth', value => ({payload: value}))
