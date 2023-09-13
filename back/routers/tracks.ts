import mongoose from "mongoose";
import express from "express";
import Track from "../modeles/Track";
import {IArtistTracks, ITrackMutation} from "../type";
import Album from "../modeles/Album";

const tracksReducer = express.Router();

tracksReducer.get('/', async (req, res) => {
    try {
        if(req.query.album) {
            const tracks = await Track.find({album: req.query.album});
            res.send(tracks);
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