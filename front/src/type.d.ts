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
  duration: string
}

export interface IAlbumMutation{
  albums: IAlbum[],
  artist: string,
}
export interface ITrackMutation {
  allTracks: ITrack[],
  album: string,
  artist: string
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
  trackId: string
}