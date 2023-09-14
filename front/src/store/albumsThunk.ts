import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbumMutation } from '../type';
import axiosApi from '../axiosApi';

export const fetchAlbum = createAsyncThunk<IAlbumMutation, string>(
  'album/fetch',
  async (id) => {
    const albumsResponse = await axiosApi.get<IAlbumMutation>(`/albums?artist=${id}`);
    return albumsResponse.data;
  }
);