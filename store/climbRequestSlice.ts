import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createClimbRequest, getAllClimbRequests, getOneClimbRequest } from '../api/climbRequestAPI';
import { ClimbAvailabilityGen } from './climbAvailabilityGenSlice';
import { ClimbAvailabilityScheduled } from './climbAvailabilityScheduledSlice';
import { User } from './userSlice';

export interface CreateClimbRequestDTO {
  initialMessage?: string;
  initiatingEntryId: string;
  targetScheduledReqId?: string;
  targetGenRequestId?: string;
  targetUserId: string;
}

export interface ClimbRequest {
  id: string;
  initialMessage: string | null;
  initiatingEntry: ClimbAvailabilityScheduled;
  initiatingUser: User;
  targetScheduledRequest: ClimbAvailabilityScheduled | null;
  targetGenRequest: ClimbAvailabilityGen | null;
  targetAccepted: boolean | null;
  targetMessageResponse: string | null;
  messages: any[] | null;
  targetUser: User;
  createdAt: Date;
}

interface ClimbRequestState {
  allClimbRequests: ClimbRequest[] | null;
  selectedClimbRequest: ClimbRequest | null;
  status: 'idle' | 'loading' | 'failed';
  error: any;
}

const initialState: ClimbRequestState = {
  allClimbRequests: null,
  selectedClimbRequest: null,
  status: 'idle',
  error: null,
}

const createClimbRequestAsync = createAsyncThunk(
  'climbRequest/create',
  async (arg: CreateClimbRequestDTO, { rejectWithValue }) => {
    try {
      const response: any = await createClimbRequest(arg);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
);

const getAllClimbRequestsAsync = createAsyncThunk(
  'climbRequest/getAll',
  async (arg: any, { rejectWithValue }) => {
    try {
      const response: any = await getAllClimbRequests();
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
);

const getOneClimbRequestAsync = createAsyncThunk(
  'climbRequest/getOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await getOneClimbRequest(id);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
)

const climbRequestSlice = createSlice({
  name: 'climbRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClimbRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClimbRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedClimbRequest = action.payload;
        state.error = null;
      })
      .addCase(createClimbRequestAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.selectedClimbRequest = null;
        state.error = action.payload;
      })
      .addCase(getAllClimbRequestsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllClimbRequestsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allClimbRequests = action.payload;
        state.error = null;
      })
      .addCase(getAllClimbRequestsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.allClimbRequests = null;
        state.error = action.payload;
      })
      .addCase(getOneClimbRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOneClimbRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedClimbRequest = action.payload;
        state.error = null;
      })
      .addCase(getOneClimbRequestAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.selectedClimbRequest = null;
        state.error = action.payload;
      });
  }
})

export default climbRequestSlice.reducer;

export {
  createClimbRequestAsync,
  getAllClimbRequestsAsync,
  getOneClimbRequestAsync,
}
