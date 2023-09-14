export interface IArtistMutation {
    title: string;
    description: string;
    image: string | null;
}

export interface IAlbumMutation {
    artist: string;
    title: string;
    year: number;
    image: string | null;
}

export interface ITrackMutation {
    album: string;
    title: string;
    duration: string;
    number: number
}

export interface IArtistTracks {
    _id: string,
    title: string,
    duration: string,
    artist: string,
}

export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface ITrackHistoryMutation {
    user: string;
    track: string;
    datetime: string;
}

export interface INewAlbums {
    _id: string,
    title: string,
    artist: string,
    year: number,
    image: string | undefined,
    tracks: number
}



