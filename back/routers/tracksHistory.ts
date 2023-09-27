import express from "express";
import User from "../modeles/User";
import {ITrackHistoryMutation} from "../type";
import mongoose from "mongoose";
import TrackHistory from "../modeles/TrackHistory";
import Track from "../modeles/Track";
import Album from "../modeles/Album";
import Artist from "../modeles/Artist";
import auth, {IRequestWithUser} from "../midlleware/auth";


const tracksHistoryRouter = express.Router();

tracksHistoryRouter.get('/', auth, async (req, res, next) => {
    try {
        const user = (req as IRequestWithUser).user;

        const trackHistory = await TrackHistory.find({user: user._id}).sort({datetime: -1}).populate('artist', 'title').populate('track', 'title');
        res.send(trackHistory);

    } catch (e) {
        next(e);
    }
});

tracksHistoryRouter.post('/',  async (req, res, next) => {
    const token = req.get('Authorization');
    const user = await User.findOne({token: token});

    if(!token) {
        return res.status(401).send({error: 'No token present!'});
    }

    if(!user) {
        res.status(401).send('Unauthorized!');
    } else {
        const userId = user._id;
        const trackId = await Track.findById(req.body.track);

        if(!trackId) {
            return res.status(401).send({error: 'No trackId present!'});
        }
        const albumId = await Album.findById(String(trackId.album));

        if(!albumId) {
            return res.status(401).send({error: 'No albumId present!'});
        }

        const artistID = await Artist.findById(String(albumId.artist));

        if(!artistID) {
            return res.status(401).send({error: 'No albumId present!'});
        }

        const trackHistoryData: ITrackHistoryMutation = {
            user: userId.toString(),
            track: req.body.track,
            datetime: new Date().toISOString(),
            artist: artistID.id,
        };

        try {
            const trackHistory = new TrackHistory(trackHistoryData);
            await trackHistory.save();

            return res.send({
                trackHistory
            });
        } catch (e) {
            if(e instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(e);
            }

            next(e);
        }
    }
});

export default tracksHistoryRouter;