import {auth, database} from '../index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import type {AuthData, Habit} from '../types';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
} from 'firebase/auth';
import type {AppDispatch} from '../types/state';
import Notification from './../utils/notification/notification';
import {ref, set, push, onValue, update, remove} from 'firebase/database';
import {changeArchiveHabitList, changeHabitList, setUserColorTheme} from './actions';

// TODO: заменить тип user
export const login = createAsyncThunk<any, AuthData>('login', async ({email, password}) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    Notification.showErrorNotification(e);
    return null;
  }
});

export const logout = createAsyncThunk<void, undefined>('logout', async () => {
  await auth.signOut();
});

// TODO: заменить тип user
export const createLogin = createAsyncThunk<any, AuthData>(
  'createLogin',
  async ({email, password, name}) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      Notification.showErrorNotification(e);
      return null;
    }
  },
);

export const deleteAccount = createAsyncThunk<void>('deleteAccount', async () => {
  try {
    const user = auth.currentUser;
    user && (await deleteUser(user));
  } catch (e) {
    Notification.showErrorNotification(e);
  }
});

export const signInAsGuest = createAsyncThunk<void>('signInAsGuest', async () => {
  try {
    await signInAnonymously(auth);
  } catch (e) {
    Notification.showErrorNotification(e);
  }
});

export const fetchHabitList = createAsyncThunk<void, undefined, {dispatch: AppDispatch}>(
  'fetchHabitList',
  async (_args, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      onValue(
        ref(database, `users/${user}/challengeHabitsList`),
        snapshot => {
          const habitsList: Habit[] = [];
          if (snapshot) {
            snapshot.forEach(item => {
              habitsList?.push(item.val());
            });
            dispatch(changeHabitList(habitsList));
          }
        },
        {onlyOnce: true},
      );
    } catch (e) {
      Notification.showErrorNotification(e);
    }
  },
);

export const fetchArchiveHabitList = createAsyncThunk<void, undefined, {dispatch: AppDispatch}>(
  'fetchArchiveHabitList',
  async (_args, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      onValue(
        ref(database, `users/${user}/archiveHabitsList`),
        snapshot => {
          const habitsList: Habit[] = [];
          if (snapshot) {
            snapshot.forEach(item => {
              habitsList?.push(item.val());
            });
            dispatch(changeArchiveHabitList(habitsList));
          }
        },
        {onlyOnce: true},
      );
    } catch (e) {
      Notification.showErrorNotification(e);
    }
  },
);

export const addHabit = createAsyncThunk<void, Habit, {dispatch: AppDispatch}>(
  'habitAction',
  async (habit, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      await push(ref(database, `users/${user}/challengeHabitsList`), habit).then(res => {
        dispatch(fetchHabitList());
      });
    } catch (e) {
      Notification.showErrorNotification(e);
    }
  },
);

export const addArchiveHabit = createAsyncThunk<void, Habit, {dispatch: AppDispatch}>(
  'archiveHabitAction',
  async (habit, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      await push(ref(database, `users/${user}/archiveHabitsList`), habit).then(res => {
        dispatch(fetchArchiveHabitList());
      });
    } catch (e) {
      Notification.showErrorNotification(e);
    }
  },
);
// TODO: сделать общую функцию snapshot.forEach
export const updateHabit = createAsyncThunk<void, Habit, {dispatch: AppDispatch}>(
  'updateHabitAction',
  async (habit, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await onValue(
        ref(database, `users/${user}/challengeHabitsList`),
        snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(item => {
              if (item.val().id === habit.id) {
                update(ref(database, `users/${user}/challengeHabitsList/${item.key}`), habit).then(
                  _ => {
                    dispatch(fetchHabitList());
                  },
                );
              }
            });
          }
        },
        {onlyOnce: true},
      );
    } catch (e) {
      Notification.showErrorNotification(e);
    }
  },
);

export const deleteHabit = createAsyncThunk<void, number, {dispatch: AppDispatch}>(
  'deleteHabitAction',
  async (habitId, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await onValue(
        ref(database, `users/${user}/challengeHabitsList`),
        snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(item => {
              if (item.val().id === habitId) {
                remove(ref(database, `users/${user}/challengeHabitsList/${item.key}`)).then(_ => {
                  dispatch(fetchHabitList());
                });
              }
            });
          }
        },
        {onlyOnce: true},
      );
    } catch (e) {
      Notification.showErrorNotification(e);
    }
  },
);

export const getColorMode = createAsyncThunk<void, undefined, {dispatch: AppDispatch}>(
  'getColorMode',
  async (_args, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await onValue(
        ref(database, `users/${user}/colorMode`),
        snapshot => {
          snapshot.exists()
            ? dispatch(setUserColorTheme(snapshot.val()))
            : dispatch(setUserColorTheme('light'));
        },
        {onlyOnce: true},
      );
    } catch (e) {
      Notification.showErrorNotification(e);
    }
  },
);

export const saveColorMode = createAsyncThunk<void, 'light' | 'dark', {dispatch: AppDispatch}>(
  'saveColorMode',
  async (colorMode, {dispatch}) => {
    try {
      const user = auth?.currentUser?.uid;
      await set(ref(database, `users/${user}/colorMode`), colorMode);
    } catch (e) {
      Notification.showErrorNotification(e);
    }
  },
);
