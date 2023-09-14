import { IAlbum } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbum } from './albumsThunk';

interface albumsState {
  albums: IAlbum[];
  fetchLoading: boolean;
  artist: string;
}

const initialState: albumsState = {
  albums: [],
  fetchLoading: false,
  artist: ''
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
      state.artist = action.payload.artist
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const albumsReducer = albumsSlice.reducer;
