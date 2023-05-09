import { auth } from '../index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthData} from '../types/index'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import Notification from './../utils/notification/notification'

//TODO: заменить тип user
export const login = createAsyncThunk<any, AuthData>('login',
    async ({email, password}) => {
        try {
            const {user} =  await signInWithEmailAndPassword(auth,email, password)
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
            const {user} = await createUserWithEmailAndPassword(auth,email, password)
            console.log('user', user)
            return user ? user : {}
        } catch (e) {
          // @ts-ignore
          Notification.showErrorNotification(e)
        }
    });
