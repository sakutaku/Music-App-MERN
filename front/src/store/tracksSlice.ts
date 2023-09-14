import { ITrack } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTrack } from './tracksThunk';

interface tracksState {
  tracks: ITrack[];
  fetchLoading: boolean;
}

const initialState: tracksState = {
  tracks: [],
  fetchLoading: false,
};

const tracksSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTrack.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTrack.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.tracks = action.payload;
    });
    builder.addCase(fetchTrack.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;
