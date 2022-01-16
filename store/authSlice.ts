import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SignupObject } from '../models/SignupObject';
import { signUp } from '../api/authAPI';

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
      });
  }
})

export default authSlice.reducer;

export {
  signUpAsync,
};
