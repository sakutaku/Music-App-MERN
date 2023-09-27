export interface IArtist{
  _id: string,
  title: string,
  image: string,
}

export interface IAlbum{
  _id: string,
  image: string,
  title: string,
  year: string,
  tracks: number
}

export interface ITrack {
  _id: string,
  number: number,
  title: string,
  duration: string,
  link: string
}

export interface IAlbumMutation{
  albums: IAlbum[],
  artist: string,
  id: string
}
export interface ITrackMutation {
  allTracks: ITrack[],
  album: string,
  artist: string,
  albumId: string
}
export interface RegisterMutation {
  username: string;
  password: string;
}
export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}
export interface GlobalError {
  error: string;
}
export interface ITrackHistoryData{
  token: string,
  info: {
    track: string
  },
}

export interface ITrackHistory{
  id: string,
  track: {
    _id: string,
    title: string
  },
  artist: {
    _id: string,
    title: string
  },
  datetime: string
}
export interface IArtistMutation{
  title: string,
  description: string,
  image: File | null
}

export interface IAlbumMutationPost {
  artist: string,
  title: string,
  year: string,
  image: File | null,
}

export interface ITrackMutationPost {
  album: string,
  title: string,
  duration: string,
  number: string,
  link: string
}

