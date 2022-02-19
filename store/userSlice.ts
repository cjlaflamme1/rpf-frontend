import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '../api/userAPI';
import { ClimberProfile } from '../models/ClimberProfile';

export interface User {
  id: string;
  climbingProfile: ClimberProfile;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
}

interface UserState {
  currentUser: User | null;
  status: 'idle' | 'loading' | 'failed';
  error: any;
}

const initialState: UserState = {
  currentUser: null,
  status: 'idle',
  error: null,
};

const getCurrentUserAsync = createAsyncThunk(
  'user/getCurrent',
  async (arg, { rejectWithValue }) => {
    try {
      const response: any = await getCurrentUser();
      return response.data;
    } catch (err: any) {
      rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getCurrentUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.currentUser = null;
        state.error = action.payload;
      });
  }
})

export default userSlice.reducer;

export {
  getCurrentUserAsync,
}
