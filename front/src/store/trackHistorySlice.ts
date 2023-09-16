import { createSlice } from '@reduxjs/toolkit';
import { createTrackHistory } from './trackHistoryThunk';
import { RootState } from '../app/store';

interface trackHistoryState {
  fetchLoading: boolean;
}

const initialState: trackHistoryState = {
  fetchLoading: false,
};

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createTrackHistory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(createTrackHistory.fulfilled, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createTrackHistory.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const tracksHistoryReducer = trackHistorySlice.reducer;
export const fetchLoading = (state: RootState) => state.trackHistory.fetchLoading;
