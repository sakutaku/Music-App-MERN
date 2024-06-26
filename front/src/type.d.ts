export interface IArtist {
  _id: string;
  title: string;
  image: string;
  isPublished: boolean;
  user: string;
}

export interface IAlbum {
  _id: string;
  image: string;
  title: string;
  year: string;
  tracks: number;
  isPublished: boolean;
  user: string;
}

export interface ITrack {
  _id: string;
  number: number;
  title: string;
  duration: string;
  link: string;
  isPublished: boolean;
  user: string;
}

export interface IAlbumMutation {
  albums: IAlbum[];
  artist: string;
  id: string;
}

export interface ITrackMutation {
  allTracks: ITrack[];
  album: string;
  artist: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID: string;
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
    };
  };
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

export interface ITrackHistory {
  id: string;
  track: {
    _id: string;
    title: string;
  };
  artist: {
    _id: string;
    title: string;
  };
  datetime: string;
}

export interface ITrackHistoryData {
  track: string;
}

export interface IArtistMutation {
  title: string;
  description: string;
  image: File | null;
  user: string;
}

export interface IAlbumMutationPost {
  artist: string;
  title: string;
  year: string;
  image: File | null;
  user: string;
}

export interface IAllAlbums {
  _id: string;
  artist: string;
  title: string;
  user: string;
  isPublished: boolean;
}

export interface ITrackMutationPost {
  album: string;
  title: string;
  duration: string;
  number: string;
  link: string;
  user: string;
}

export interface ITrackMutationPostTwo {
  album: string;
  artist: string;
  title: string;
  duration: string;
  number: string;
  link: string;
  user: string;
}
