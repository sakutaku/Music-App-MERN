import { IArtist } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { createArtists, fetchArtists } from './artistsThunk';

interface artistsState {
  allArtists: IArtist[];
  fetchLoading: boolean;
  createLoading: boolean
}

const initialState: artistsState = {
  allArtists: [],
  fetchLoading: false,
  createLoading: false
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.allArtists = action.payload;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createArtists.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createArtists.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createArtists.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const artistsReducer = artistsSlice.reducer;