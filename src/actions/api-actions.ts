import { auth } from '../index';

import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthData} from '../types/index'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import {setAuthStatus} from './actions'
import {redirect} from 'react-router-dom';
import {AppRouteList} from '../router/enums/index';

export const login = createAsyncThunk<void, AuthData>('login',
    async ({email, password}) => {
        try {
            const result= await signInWithEmailAndPassword(auth,email, password)
            console.log(result)
            if (result) {
                setAuthStatus(true)
                redirect(AppRouteList.CreateHabitPage)
            }
        } catch (e) {
            console.log(e)
        }
    });

export const logout = createAsyncThunk<void, undefined>('logout',
    async () => {
        await auth.signOut();
        setAuthStatus(false)
        redirect(AppRouteList.Home)
});

export const createLogin = createAsyncThunk<void, AuthData>('createLogin',
    async ({email, password, name}) => {
        try {
            const res = await createUserWithEmailAndPassword(auth,email, password)
            const uid = res.user

            if (uid) {
                setAuthStatus(true)
                redirect(AppRouteList.CreateHabitPage)
            }


        } catch (e) {
            console.log(e)
        }
    });
