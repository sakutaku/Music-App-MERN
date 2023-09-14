import { ITrack } from '../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTrack } from './tracksThunk';

interface tracksState {
  tracks: ITrack[];
  fetchLoading: boolean;
  artist: string;
  album: string;
}

const initialState: tracksState = {
  tracks: [],
  fetchLoading: false,
  artist: '',
  album: ''
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
  },
  extraReducers: builder => {
    builder.addCase(fetchTrack.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTrack.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.tracks = action.payload.allTracks;
      state.album = action.payload.album;
      state.artist = action.payload.artist
    });
    builder.addCase(fetchTrack.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;
export const { addArtist, addAlbum } = tracksSlice.actions;
