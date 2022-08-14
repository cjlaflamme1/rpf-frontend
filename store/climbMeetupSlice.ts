import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createClimbMeetup, createClimbMessage, getAllClimbMeetups, getOneClimbMeetup, updateClimbMessage } from '../api/climbMeetupAPI';
import { ClimbRequest } from './climbRequestSlice';
import { User } from './userSlice';

export interface CreateClimbMessageDTO {
  message: string;
  climbMeetupId: string;
}

export interface CreateClimbMeetupDTO {
  climbRequestId: string;
  userIds: string[];
}

export interface ClimbMessage {
  id: string;
  message: string;
  read: boolean;
  climbMeetup: ClimbMeetup;
  user: User;
  createdAt: Date;
}

export interface ClimbMeetup {
  id: string;
  climbRequest: ClimbRequest;
  messages: ClimbMessage[] | null;
  users: User[];
  createdAt: Date;
}

interface ClimbMeetupState {
  allClimbMeetups: ClimbMeetup[] | null;
  selectedClimbMeetup: ClimbMeetup | null;
  status: 'idle' | 'loading' | 'failed';
  error: any;
}

const initialState: ClimbMeetupState = {
  allClimbMeetups: null,
  selectedClimbMeetup: null,
  status: 'idle',
  error: null,
}

const createClimbMessageAsync = createAsyncThunk(
  'climbMessage/create',
  async (arg: CreateClimbMessageDTO, { rejectWithValue }) => {
    try {
      const response: any = await createClimbMessage(arg);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
)

const updateClimbMessageAsync = createAsyncThunk(
  'climbMessage/update',
  async (arg: { id: string, updateBody: Partial<ClimbMessage>}, { rejectWithValue }) => {
    try {
      const response: any = await updateClimbMessage(arg.id, arg.updateBody);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
)

const createClimbMeetupAsync = createAsyncThunk(
  'climbMeetup/create',
  async (arg: CreateClimbMeetupDTO, { rejectWithValue }) => {
    try {
      const response: any = await createClimbMeetup(arg);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
);

const getAllClimbMeetupsAsync = createAsyncThunk(
  'climbMeetup/getAll',
  async (arg, { rejectWithValue }) => {
    try {
      const response: any = await getAllClimbMeetups();
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
);

const getOneClimbMeetupAsync = createAsyncThunk(
  'climbMeetup/getOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await getOneClimbMeetup(id);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
)

const climbMeetupSlice = createSlice({
  name: 'climbMeetup',
  initialState,
  reducers: {
    clearSelectedMeetup(state) {
      state.selectedClimbMeetup = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClimbMeetupAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClimbMeetupAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedClimbMeetup = action.payload;
        state.error = null;
      })
      .addCase(createClimbMeetupAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.selectedClimbMeetup = null;
        state.error = action.payload;
      })
      .addCase(getAllClimbMeetupsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllClimbMeetupsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allClimbMeetups = action.payload;
        state.error = null;
      })
      .addCase(getAllClimbMeetupsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.allClimbMeetups = [];
        state.error = action.payload;
      })
      .addCase(getOneClimbMeetupAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOneClimbMeetupAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedClimbMeetup = action.payload;
        state.error = null;
      })
      .addCase(getOneClimbMeetupAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.selectedClimbMeetup = null;
        state.error = action.payload;
      })
      .addCase(createClimbMessageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClimbMessageAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(createClimbMessageAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateClimbMessageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateClimbMessageAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(updateClimbMessageAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
})

export const { clearSelectedMeetup } = climbMeetupSlice.actions;

export default climbMeetupSlice.reducer;

export {
  createClimbMeetupAsync,
  getAllClimbMeetupsAsync,
  getOneClimbMeetupAsync,
  createClimbMessageAsync,
  updateClimbMessageAsync,
}