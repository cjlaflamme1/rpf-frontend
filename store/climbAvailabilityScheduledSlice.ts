import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createScheduledAvail, deleteOneScheduledAvail, getAllScheduledAvail, getOneScheduledAvail, updateOneScheduledAvail } from '../api/climbAvailabilityScheduledAPI';
import { ScheduledAvailabilityModel } from '../models/ScheduledAvailability';
import { User } from './userSlice';

export interface ClimbAvailabilityScheduled {
  id: string;
  startDateTime: Date;
  endDateTime: Date;
  areas: string[];
  initialUser: User;
}

interface climbAvailabilityScheduledState {
  allScheduledAvailability: ClimbAvailabilityScheduled[] | null;
  selectedScheduledAvailability: ClimbAvailabilityScheduled | null;
  status: 'idle' | 'loading' | 'failed';
  error: any;
}

const initialState: climbAvailabilityScheduledState = {
  allScheduledAvailability: null,
  selectedScheduledAvailability: null,
  status: 'idle',
  error: null,
};

const createClimbAvailabilityScheduledAsync = createAsyncThunk(
  'climbAvailabilityScheduled/create',
  async (arg: ScheduledAvailabilityModel, { rejectWithValue }) => {
    try {
      const response: any = await createScheduledAvail(arg);
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

const getAllclimbAvailabilityScheduledAsync = createAsyncThunk(
  'climbAvailabilityScheduled/getAll',
  async (arg, { rejectWithValue }) => {
    try {
      const response: any = await getAllScheduledAvail();
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

const getOneClimbAvailScheduledAsync = createAsyncThunk(
  'climbAvailabilityScheduled/getOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await getOneScheduledAvail(id);
      if (response.data && response.data.areas) {
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

const updateOneScheduledAvailAsync = createAsyncThunk(
  'climbAvailabilityScheduled/update',
  async (arg: { id: string, updateBody: Partial<ClimbAvailabilityScheduled>}, { rejectWithValue }) => {
    try {
      const response: any = await updateOneScheduledAvail(arg.id, arg.updateBody);
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

const deleteOneScheduledAvailAsync = createAsyncThunk(
  'climbAvailabilityScheduled/deleteOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await deleteOneScheduledAvail(id);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
);

const climbAvailabilityScheduledSlice = createSlice({
  name: 'climbAvailabilityScheduled',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClimbAvailabilityScheduledAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClimbAvailabilityScheduledAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedScheduledAvailability = action.payload;
        state.error = null;
      })
      .addCase(createClimbAvailabilityScheduledAsync.rejected, (state, action) => {
        state.status = 'failed',
        state.selectedScheduledAvailability = null;
        state.error = action.payload;
      })
      .addCase(getAllclimbAvailabilityScheduledAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllclimbAvailabilityScheduledAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allScheduledAvailability = action.payload;
        state.error = null;
      })
      .addCase(getAllclimbAvailabilityScheduledAsync.rejected, (state, action) => {
        state.status = 'failed',
        state.allScheduledAvailability = null;
        state.error = action.payload;
      })
      .addCase(getOneClimbAvailScheduledAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOneClimbAvailScheduledAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedScheduledAvailability = action.payload;
        state.error = null;
      })
      .addCase(getOneClimbAvailScheduledAsync.rejected, (state, action) => {
        state.status = 'failed',
        state.selectedScheduledAvailability = null;
        state.error = action.payload;
      })
      .addCase(updateOneScheduledAvailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOneScheduledAvailAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedScheduledAvailability = action.payload;
        state.error = null;
      })
      .addCase(updateOneScheduledAvailAsync.rejected, (state, action) => {
        state.status = 'failed',
        state.selectedScheduledAvailability = null;
        state.error = action.payload;
      })
      .addCase(deleteOneScheduledAvailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOneScheduledAvailAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(deleteOneScheduledAvailAsync.rejected, (state, action) => {
        state.status = 'failed',
        state.error = action.payload;
      });
  }
})

export default climbAvailabilityScheduledSlice.reducer;

export {
  createClimbAvailabilityScheduledAsync,
  getAllclimbAvailabilityScheduledAsync,
  getOneClimbAvailScheduledAsync,
  updateOneScheduledAvailAsync,
  deleteOneScheduledAvailAsync,
}
