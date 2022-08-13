import {
  configureStore, ThunkAction, Action, combineReducers,
} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import climbAvailabilityGenSlice from './climbAvailabilityGenSlice';
import climbAvailabilityScheduledSlice from './climbAvailabilityScheduledSlice';
import climbMeetupSlice from './climbMeetupSlice';
import climbRequestSlice from './climbRequestSlice';
import userSlice from './userSlice';

const reducer = combineReducers({
  authState: authSlice,
  userState: userSlice,
  climbAvailabilityGenState: climbAvailabilityGenSlice,
  climbAvailabilityScheduledState: climbAvailabilityScheduledSlice,
  climbRequestState: climbRequestSlice,
  climbMeetupState: climbMeetupSlice,
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
