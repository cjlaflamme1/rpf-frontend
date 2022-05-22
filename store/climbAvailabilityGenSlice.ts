import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createGenAvail, getAllGenAvail } from '../api/climbAvailabilityGenAPI';
import { GeneralAvailabilityModel } from '../models/GeneralAvailability';

export interface ClimbAvailabilityGen {
  id: string;
  day: string;
  startHour: number;
  startMinute: number;
  startAMPM: 'AM' | 'PM';
  finishHour: number;
  finishMinute: number;
  finishAMPM: 'AM' | 'PM';
  areas: string[];
}

interface ClimbAvailabilityGenState {
  allClimbGenAvailability: ClimbAvailabilityGen[] | null;
  selectedClimbGenAvailability: ClimbAvailabilityGen | null;
  status: 'idle' | 'loading' | 'failed';
  error: any;
}

const initialState: ClimbAvailabilityGenState = {
  allClimbGenAvailability: null,
  selectedClimbGenAvailability: null,
  status: 'idle',
  error: null,
};

const createClimbAvailabilityGenAsync = createAsyncThunk(
  'climbAvailabilityGen/create',
  async (arg: GeneralAvailabilityModel, { rejectWithValue }) => {
    try {
      const response: any = await createGenAvail(arg);
      if (response.data.areas) {
        response.data.areas = JSON.parse(response.data.areas);
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

const getAllClimbAvailabilityGenAsync = createAsyncThunk(
  'climbAvailabilityGen/getAll',
  async (arg, { rejectWithValue }) => {
    try {
      const response: any = await getAllGenAvail();
      if (response.data && response.data.length > 0) {
        const repacked = response.data.map((item: any) => {
          if (item.areas) {
            item.areas = JSON.parse(item.areas);
          }
          return item;
        })
        return repacked;
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

const climbAvailabilityGenSlice = createSlice({
  name: 'climbAvailabilityGen',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClimbAvailabilityGenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClimbAvailabilityGenAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedClimbGenAvailability = action.payload;
        state.error = null;
      })
      .addCase(createClimbAvailabilityGenAsync.rejected, (state, action) => {
        state.status = 'failed',
        state.selectedClimbGenAvailability = null;
        state.error = action.payload;
      })
      .addCase(getAllClimbAvailabilityGenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllClimbAvailabilityGenAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allClimbGenAvailability = action.payload;
        state.error = null;
      })
      .addCase(getAllClimbAvailabilityGenAsync.rejected, (state, action) => {
        state.status = 'failed',
        state.allClimbGenAvailability = null;
        state.error = action.payload;
      });
  }
})

export default climbAvailabilityGenSlice.reducer;

export {
  createClimbAvailabilityGenAsync,
  getAllClimbAvailabilityGenAsync,
}
