import { createSlice } from '@reduxjs/toolkit';
import {createTrackHistory, fetchTrackHistory} from './trackHistoryThunk';
import { RootState } from '../app/store';
import {ITrackHistory} from "../type";

interface trackHistoryState {
  fetchLoading: boolean;
  createLoading: boolean;
  items: ITrackHistory[];
}

const initialState: trackHistoryState = {
  fetchLoading: false,
  createLoading: false,
  items: [],
};

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTrackHistory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTrackHistory.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchTrackHistory.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createTrackHistory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTrackHistory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTrackHistory.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const tracksHistoryReducer = trackHistorySlice.reducer;
export const selectItems = (state: RootState) => state.trackHistory.items;
export const selectFetchLoading = (state: RootState) => state.trackHistory.fetchLoading;
