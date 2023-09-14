import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbum } from '../type';
import axiosApi from '../axiosApi';

export const fetchAlbum = createAsyncThunk<IAlbum[], string>(
  'album/fetch',
  async (id) => {
    const albumsResponse = await axiosApi.get<IAlbum[]>(`/albums?artist=${id}`);
    return albumsResponse.data;
  }
);