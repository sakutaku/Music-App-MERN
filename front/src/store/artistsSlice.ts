import { IArtist } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists } from './artistsThunk';

interface artistsState {
  allArtists: IArtist[];
  fetchLoading: boolean;
}

const initialState: artistsState = {
  allArtists: [],
  fetchLoading: false,
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
  }
});

export const artistsReducer = artistsSlice.reducer;