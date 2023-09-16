import express from "express";
import User from "../modeles/User";
import {ITrackHistoryMutation} from "../type";
import mongoose from "mongoose";
import TrackHistory from "../modeles/TrackHistory";
import auth from "../midlleware/auth";


const tracksHistoryRouter = express.Router();

tracksHistoryRouter.get('/', async (req, res, next) => {
    const token = req.get('Authorization');
    const user = await User.findOne({token: token});

    if(!token) {
        return res.status(401).send({error: 'No token present!'});
    }

    if(!user) {
        res.status(401).send('Unauthorized!');
    } else {
        const trackHistory = await TrackHistory.find({user: user._id}).sort({year: -1});

        res.send(trackHistory);
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
        const userId = user._id
        const trackHistoryData: ITrackHistoryMutation = {
            user: userId.toString(),
            track: req.body.track,
            datetime: new Date().toISOString(),
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