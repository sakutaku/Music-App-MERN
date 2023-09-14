import mongoose from "mongoose";
import express from "express";
import {IArtistTracks, ITrackMutation} from "../type";
import Album from "../modeles/Album";
import Track from "../modeles/Track";

const tracksReducer = express.Router();

tracksReducer.get('/', async (req, res) => {
    try {
        if(req.query.album) {
            const tracks = await Track.find({album: req.query.album}).sort({number: 1});
            const albumTitle = await Album.findById(req.query.album);
            const album = await Album.findById(req.query.album).populate('artist');

            if(!album || !albumTitle) {
                return res.status(401).send({error: 'No album present!'});
            }

            const arr = String(album.artist).split(',');

            const  replace = /[']/g;
            const final = arr[1].replace(replace, '');
            const name = final.slice(10);

            const tracksInfo = {
                allTracks: tracks,
                album: albumTitle.title,
                artist: name,
            };

            res.send(tracksInfo);
        } else if (req.query.artist) {
            const tracksArtist = await Album.find({artist: req.query.artist});
            const tracks = await Track.find();
            const newArr: IArtistTracks[] = [];

            tracks.filter((oneTr) => {
                tracksArtist.filter((oneTrAr) => {
                    if(oneTr.album.toString() === oneTrAr.id && oneTr.duration) {
                        const newObj = {
                            _id: oneTr.id.toString(),
                            title: oneTr.title,
                            duration: oneTr.duration,
                            artist: oneTrAr.artist.toString(),
                        };

                        newArr.push(newObj);
                    }
                })
            });

            res.send(newArr);
        } else {
            const tracks = await Track.find();
            return res.send(tracks);
        }
    } catch (e) {
        return res.status(500).send('Error');
    }
});

tracksReducer.post('/', async (req, res, next) => {
    const trackData: ITrackMutation = {
        album: req.body.album,
        title: req.body.title,
        duration: req.body.duration,
        number: req.body.number
    };

    try {
        const track = new Track(trackData);
        await track.save();

        return res.send({
            track
        });
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

export default tracksReducer;