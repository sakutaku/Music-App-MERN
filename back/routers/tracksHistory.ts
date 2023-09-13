import express from "express";
import User from "../modeles/User";
import {ITrackHistoryMutation} from "../type";
import mongoose from "mongoose";
import TrackHistory from "../modeles/TrackHistory";


const tracksHistoryRouter = express.Router();

tracksHistoryRouter.post('/', async (req, res, next) => {
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

            console.log(trackHistory)
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