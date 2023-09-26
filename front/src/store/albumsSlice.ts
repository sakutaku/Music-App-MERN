import { IAlbum } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { createAlbum, fetchAlbum } from './albumsThunk';

interface albumsState {
  albums: IAlbum[];
  fetchLoading: boolean;
  artist: string;
  id: string;
  createLoading: boolean
}

const initialState: albumsState = {
  albums: [],
  fetchLoading: false,
  artist: '',
  id: '',
  createLoading: false
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
      state.albums = action.payload.albums;
      state.artist = action.payload.artist;
      state.id = action.payload.id
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createAlbum.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const albumsReducer = albumsSlice.reducer;
