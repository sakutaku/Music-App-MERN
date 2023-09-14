import {Mongoose, Schema} from "mongoose";

export interface IArtistMutation {
    title: string;
    description: string;
    image: string | null;
}

export interface IAlbumMutation {
    artist: string;
    title: string;
    year: string;
    image: string | null;
}

export interface ITrackMutation {
    album: string;
    title: string;
    duration: string;
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

export interface ITracksModifies {
    _id: string,
    title: string,
    number: number,
    duration: string | undefined,
    artist: string,
    album: string
}

export interface IArtistInfo extends Mongoose.Document{
    // _id: Types.ObjectId,
    title: string,
}

export interface Test  extends Mongoose.Document{
    title: string,
    prototype?: ObjectId | undefined;
    cacheHexString?: unknown;
    generate?: {} | undefined;
    createFromTime?: {} | undefined;
    createFromHexString?: {} | undefined;
    createFromBase64?: {} | undefined;
    isValid?: {} | undefined;
}