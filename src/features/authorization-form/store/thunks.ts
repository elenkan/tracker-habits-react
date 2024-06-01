import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthData, Habit } from 'shared/types'
import type { AppDispatch } from 'shared/types/state'
import { setIsLoading } from 'shared/store/actions'
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from 'shared/config/firebase'
import { Notification } from 'shared/ui'
import { addHabit } from 'shared/store/thunks/habit'

export const login = createAsyncThunk<void, AuthData, { dispatch: AppDispatch }>(
  'login',
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch(setIsLoading(true))
      await signInWithEmailAndPassword(auth, email, password)
      dispatch(setIsLoading(false))
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)

export const createLogin = createAsyncThunk<void, AuthData, { dispatch: AppDispatch }>(
  'createLogin',
  async ({ email, password, name }, { dispatch }) => {
    try {
      dispatch(setIsLoading(true))
      await createUserWithEmailAndPassword(auth, email, password)
      dispatch(setIsLoading(false))
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)

export const signInAsGuest = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
  'signInAsGuest',
  async (_args, { dispatch }) => {
    try {
      await signInAnonymously(auth)
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)

export const addGuestHabits = createAsyncThunk<void, Habit[], { dispatch: AppDispatch }>(
  'habitsAction',
  async (habits, { dispatch }) => {
    try {
      dispatch(setIsLoading(true))
      for (const habit of habits) {
        await dispatch(addHabit(habit))
      }
      dispatch(setIsLoading(false))
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)
