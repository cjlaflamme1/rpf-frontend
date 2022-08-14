import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createClimbRequest, getAllClimbRequests, getOneClimbRequest, updateOneClimbRequest } from '../api/climbRequestAPI';
import { ClimbAvailabilityGen } from './climbAvailabilityGenSlice';
import { ClimbAvailabilityScheduled } from './climbAvailabilityScheduledSlice';
import { ClimbMeetup } from './climbMeetupSlice';
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
  climbMeetup?: ClimbMeetup;
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
      if (
        response.data.initiatingEntry &&
        response.data.initiatingEntry.areas
      ) {
        response.data.initiatingEntry.areas = JSON.parse(response.data.initiatingEntry.areas);
      }
      if (
        response.data.targetScheduledRequest &&
        response.data.targetScheduledRequest.areas
      ) {
        response.data.targetScheduledRequest.areas = JSON.parse(response.data.targetScheduledRequest.areas);
      }
      if (
        response.data.targetGenRequest &&
        response.data.targetGenRequest.areas
      ) {
        response.data.targetGenRequest.areas = JSON.parse(response.data.targetGenRequest.areas);
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

const getAllClimbRequestsAsync = createAsyncThunk(
  'climbRequest/getAll',
  async (arg, { rejectWithValue }) => {
    try {
      const response: any = await getAllClimbRequests();
      if (response.data && response.data.length > 0) {
        response.data.map((req: any) => {
          if (
            req.initiatingEntry &&
            req.initiatingEntry.areas
          ) {
            req.initiatingEntry.areas = JSON.parse(req.initiatingEntry.areas);
          }
          if (
            req.targetScheduledRequest &&
            req.targetScheduledRequest.areas
          ) {
            req.targetScheduledRequest.areas = JSON.parse(req.targetScheduledRequest.areas);
          }
          if (
            req.targetGenRequest &&
            req.targetGenRequest.areas
          ) {
            req.targetGenRequest.areas = JSON.parse(req.targetGenRequest.areas);
          }
        })
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

const getOneClimbRequestAsync = createAsyncThunk(
  'climbRequest/getOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await getOneClimbRequest(id);
      if (
        response.data.initiatingEntry &&
        response.data.initiatingEntry.areas
      ) {
        response.data.initiatingEntry.areas = JSON.parse(response.data.initiatingEntry.areas);
      }
      if (
        response.data.targetScheduledRequest &&
        response.data.targetScheduledRequest.areas
      ) {
        response.data.targetScheduledRequest.areas = JSON.parse(response.data.targetScheduledRequest.areas);
      }
      if (
        response.data.targetGenRequest &&
        response.data.targetGenRequest.areas
      ) {
        response.data.targetGenRequest.areas = JSON.parse(response.data.targetGenRequest.areas);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
      });
    }
  },
)

const updateOneClimbRequestAsync = createAsyncThunk(
  'climbRequest/update',
  async (arg: { id: string, updateBody: Partial<ClimbRequest>}, { rejectWithValue }) => {
    try {
      const response: any = await updateOneClimbRequest(arg.id, arg.updateBody);
      if (
        response.data.initiatingEntry &&
        response.data.initiatingEntry.areas
      ) {
        response.data.initiatingEntry.areas = JSON.parse(response.data.initiatingEntry.areas);
      }
      if (
        response.data.targetScheduledRequest &&
        response.data.targetScheduledRequest.areas
      ) {
        response.data.targetScheduledRequest.areas = JSON.parse(response.data.targetScheduledRequest.areas);
      }
      if (
        response.data.targetGenRequest &&
        response.data.targetGenRequest.areas
      ) {
        response.data.targetGenRequest.areas = JSON.parse(response.data.targetGenRequest.areas);
      }
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
  reducers: {
    clearSelectedRequest(state) {
      state.selectedClimbRequest = null;
    }
  },
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
      })
      .addCase(updateOneClimbRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOneClimbRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedClimbRequest = action.payload;
        state.error = null;
      })
      .addCase(updateOneClimbRequestAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.selectedClimbRequest = null;
        state.error = action.payload;
      });
  }
})

export const { clearSelectedRequest } = climbRequestSlice.actions;

export default climbRequestSlice.reducer;

export {
  createClimbRequestAsync,
  getAllClimbRequestsAsync,
  getOneClimbRequestAsync,
  updateOneClimbRequestAsync,
}
