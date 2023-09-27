import { ITrack } from '../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTrack, fetchTrack } from './tracksThunk';
import { RootState } from '../app/store';

interface tracksState {
  tracks: ITrack[];
  fetchLoading: boolean;
  artist: string;
  album: string;
  albumId: string;
  showYoutube: boolean,
  link: string,
  createLoading: boolean
}

const initialState: tracksState = {
  tracks: [],
  fetchLoading: false,
  artist: '',
  album: '',
  albumId: '',
  showYoutube: false,
  link: '',
  createLoading: false
};

const tracksSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    addArtist: (state, action: PayloadAction<string>) => {
      state.artist = action.payload;
    },
    addAlbum: (state, action: PayloadAction<string>) => {
      state.album = action.payload;
    },
    turnYoutube: (state) => {
      state.showYoutube = true;
    },
    turnOffYoutube: (state) => {
      state.showYoutube = false
    },
    addLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTrack.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTrack.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.tracks = action.payload.allTracks;
      state.album = action.payload.album;
      state.artist = action.payload.artist;
      state.albumId = action.payload.albumId;
    });
    builder.addCase(fetchTrack.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createTrack.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTrack.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTrack.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectFetchLoading = (state: RootState) => state.tracks.fetchLoading;
export const selectAlbum = (state: RootState) => state.tracks.album;
export const selectArtist = (state: RootState) => state.tracks.artist;
export const selectShowYouTube = (state: RootState) => state.tracks.showYoutube;
export const selectLink = (state: RootState) => state.tracks.link;
export const selectAlbumId = (state: RootState) => state.tracks.albumId;
export const {
  turnYoutube,
  turnOffYoutube,
  addLink} = tracksSlice.actions;
