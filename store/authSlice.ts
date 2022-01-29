import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { SignupObject } from '../models/SignupObject';
import { login, signUp } from '../api/authAPI';

interface AuthState {
  loggedIn: boolean;
  email: string;
  accessToken: string;
}

interface InitialState {
  currentAuth: AuthState | null;
  status: 'idle' | 'loading' | 'failed';
  error: any;
}

const initialState: InitialState = {
  currentAuth: null,
  status: 'idle',
  error: null,
};

const signUpAsync = createAsyncThunk(
  'auth/signup',
  async (newUser: SignupObject, { rejectWithValue }) => {
    try {
      const response: any = await signUp(newUser);
      if (response.data.access_token) {
        SecureStore.setItemAsync('jwt', response.data.access_token);
      }
      return response.data;
     } catch (err: any) {
       return rejectWithValue({
         name: err.name,
         message: err.message,
       });
     }
  },
);

const signInAsync = createAsyncThunk(
  'auth/signin',
  async (signInObject: {email: string, password: string}, { rejectWithValue }) => {
    try {
      const response: any = await login(signInObject);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentAuth = action.payload;
        state.error = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.currentAuth = null;
        state.error = action.payload;
      })
      .addCase(signInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentAuth = action.payload;
        state.error = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.currentAuth = null;
        state.error = action.payload;
      });
  }
})

export default authSlice.reducer;

export {
  signUpAsync,
  signInAsync,
};
