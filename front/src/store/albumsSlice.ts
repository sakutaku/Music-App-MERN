import { IAlbum } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbum } from './albumsThunk';

interface albumsState {
  album: IAlbum[];
  fetchLoading: boolean;
}

const initialState: albumsState = {
  album: [],
  fetchLoading: false,
};

const albumsSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.album = action.payload;
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const albumsReducer = albumsSlice.reducer;
