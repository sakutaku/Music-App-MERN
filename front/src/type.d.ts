export interface IArtist{
  _id: string,
  title: string,
  image: string,
}

export interface IAlbum{
  _id: string,
  image: string,
  title: string,
  year: string
}

export interface ITrack {
  _id: string,
  number: number,
  title: string,
  duration: string
}