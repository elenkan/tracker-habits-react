import {createAction} from '@reduxjs/toolkit';

export const addHabit = createAction('addHabit', habit => ({payload: habit}));
export const changeHabitList = createAction('changeHabitList', list => ({payload: list}));
export const changeHabitItem = createAction('changeHabitItem', list => ({payload: list}));
export const addColorMood = createAction('addColorMood', colorMood => ({payload: colorMood}));
export const addChangeableHabit = createAction('addChangeableHabit', changeableHabit => ({payload: changeableHabit}));
export const updateProgressData = createAction('updateProgressData', list => ({payload: list}));
export const changeProgressData = createAction('changeProgressData', progressData => ({payload: progressData}));
export const setAuthStatus = createAction('setAuthStatus', value => ({payload: value}));
export const setUserData = createAction('setUserData', value => ({payload: value}));
export const setModeApp = createAction('setModeApp', value => ({payload: value}));
