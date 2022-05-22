import {
  configureStore, ThunkAction, Action, combineReducers,
} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import climbAvailabilityGenSlice from './climbAvailabilityGenSlice';
import userSlice from './userSlice';

const reducer = combineReducers({
  authState: authSlice,
  userState: userSlice,
  climbAvailabilityGenState: climbAvailabilityGenSlice,
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
