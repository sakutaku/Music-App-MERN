import { IAlbum, IAllAlbums } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import {
  changeStatusAlbum,
  createAlbum,
  deleteAlbum,
  fetchAlbum,
  fetchAlbums,
} from './albumsThunk';
import { RootState } from '../app/store';

interface albumsState {
  albums: IAlbum[];
  allAlbums: IAllAlbums[];
  fetchLoading: boolean;
  artist: string;
  id: string;
  createLoading: boolean;
  deleteLoading: boolean;
  changeLoading: boolean;
}

const initialState: albumsState = {
  albums: [],
  allAlbums: [],
  fetchLoading: false,
  artist: '',
  id: '',
  createLoading: false,
  deleteLoading: false,
  changeLoading: false,
};

const albumsSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.albums = action.payload.albums;
      state.artist = action.payload.artist;
      state.id = action.payload.id;
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.allAlbums = action.payload;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
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
    builder.addCase(deleteAlbum.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteAlbum.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteAlbum.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(changeStatusAlbum.pending, (state) => {
      state.changeLoading = true;
    });
    builder.addCase(changeStatusAlbum.fulfilled, (state) => {
      state.changeLoading = false;
    });
    builder.addCase(changeStatusAlbum.rejected, (state) => {
      state.changeLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAllAlbums = (state: RootState) => state.albums.allAlbums;
export const selectFetchLoading = (state: RootState) => state.artists.fetchLoading;
export const selectAlbumArtist = (state: RootState) => state.albums.artist;
