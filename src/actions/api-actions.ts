import {auth, database} from '../index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthData, Habit} from '../types/index'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously
} from 'firebase/auth'
import {AppDispatch} from '../types/state';
import Notification from './../utils/notification/notification'
import { ref, set, push, onValue } from 'firebase/database';
import {changeHabitList, setCurrentTheme} from './actions';

//TODO: заменить тип user
export const login = createAsyncThunk<any, AuthData>('login',
  async ({email, password}) => {
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password)
      return user ? user : {}
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  });

export const logout = createAsyncThunk<void, undefined>('logout',
  async () => {
    await auth.signOut();
  });

//TODO: заменить тип user
export const createLogin = createAsyncThunk<any, AuthData>('createLogin',
  async ({email, password, name}) => {
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      return user ? user : {}
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  });

export const deleteAccount = createAsyncThunk<void>('deleteAccount',
  async () => {
    try {
      const user = auth.currentUser;
      user && await deleteUser(user);
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  });

export const signInAsGuest = createAsyncThunk<void>('signInAsGuest',
  async () => {
    try {
      await signInAnonymously(auth)
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  });

export const fetchHabitList = createAsyncThunk<void, undefined, {dispatch: AppDispatch}>('fetchHabitList',
  async (_args, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      await onValue(ref(database, `users/${user}/challengeHabitsList`), (snapshot) => {
        if (snapshot) {
          snapshot.forEach( item => {
            console.log(item.val())
            dispatch(changeHabitList(item.val()))
          })
        }
      }, {onlyOnce: true})

    } catch (e) {
      Notification.showErrorNotification(e)
    }
  });

// export const addHabitList = createAsyncThunk<void, Habit[], {dispatch: AppDispatch}>('habitListAction',
//   async (challengeHabitsList, {dispatch}) => {
//     try {
//       const user = auth?.currentUser?.uid;
//       await push(ref(database, `users/${user}/challengeHabitsList`), challengeHabitsList)
//         .then((res) => console.log(res.key) );
//     } catch (e) {
//       Notification.showErrorNotification(e)
//     }
//   });

export const setColorMode = createAsyncThunk<void, undefined, {dispatch: AppDispatch}>('setColorMode',
  async (_args, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      await onValue(ref(database, `users/${user}/colorMode`), (snapshot) => {
        if (snapshot) {
          snapshot.forEach( item => {
            dispatch(setCurrentTheme(item.val()))
          })
        }
      }, {onlyOnce: true})
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  });

export const saveColorMode = createAsyncThunk<void, 'light' | 'dark', {dispatch: AppDispatch}>('saveColorMode',
  async (colorMode, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      await set(ref(database, `users/${user}/colorMode`), colorMode);
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  });


