import { IArtist } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { changeStatus, createArtists, deleteArtist, fetchArtists } from './artistsThunk';
import { RootState } from '../app/store';

interface artistsState {
  allArtists: IArtist[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  changeLoading: boolean;
}

const initialState: artistsState = {
  allArtists: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  changeLoading: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    builder.addCase(deleteArtist.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteArtist.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteArtist.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(changeStatus.pending, (state) => {
      state.changeLoading = true;
    });
    builder.addCase(changeStatus.fulfilled, (state) => {
      state.changeLoading = false;
    });
    builder.addCase(changeStatus.rejected, (state) => {
      state.changeLoading = false;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.allArtists;
export const selectFetchLoading = (state: RootState) => state.artists.fetchLoading;
