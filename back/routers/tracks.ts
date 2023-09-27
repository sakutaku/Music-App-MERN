import mongoose from "mongoose";
import express from "express";
import {IArtistTracks, ITrackMutation} from "../type";
import Album from "../modeles/Album";
import Track from "../modeles/Track";
import auth from "../midlleware/auth";
import Artist from "../modeles/Artist";
import permit from "../midlleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        if(req.query.album) {
            const tracks = await Track.find({album: req.query.album}).sort({number: 1});
            const album = await Album.findById(req.query.album).populate('artist');

            if(!album) {
                return res.status(401).send({error: 'No album present!'});
            }

            const arr = String(album.artist).split(',');

            const  replace = /[']/g;
            const final = arr[1].replace(replace, '');
            const name = final.slice(10);

            const tracksInfo = {
                allTracks: tracks,
                album: album.title,
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

tracksRouter.get('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);

        if(!track) {
            return res.status(404).send('Not found!');
        }

        return res.send(track.title);
    } catch {
        return res.status(500).send('Error!');
    }
});
tracksRouter.post('/', auth, async (req, res, next) => {
    const trackData: ITrackMutation = {
        album: req.body.album,
        title: req.body.title,
        duration: req.body.duration,
        number: Number(req.body.number),
        link: req.body.link,
        isPublished: false
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

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const trackId = req.params.id;

        const track = await Artist.findById(trackId);

        if (!track) {
            return res.status(404).json({ error: 'Track not found' });
        }

        await Track.deleteOne({ _id: track._id });

        return res.send('Track deleted!');
    } catch (e) {
        next(e);
    }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
   try {
       const trackId = req.params.id;

       const track = await Track.findById(trackId);

       if (!track) {
           return res.status(404).json({ error: 'Track not found' });
       }

       await Track.findByIdAndUpdate(req.params.id, {isPublished: !track.isPublished});
   } catch (e) {
       next(e);
   }
});
export default tracksRouter;