import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import channelReduer from '../features/channelSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReduer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
