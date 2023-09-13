import express from "express";
import Artist from "../modeles/Artist";
import {imagesUpload} from "../multer";
import {IArtistMutation} from "../type";
import mongoose from "mongoose";

const artistsReducer = express.Router();

artistsReducer.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
        return res.status(500).send('Error');
    }
});

artistsReducer.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const artistData: IArtistMutation = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    };

    try {
        const artist = new Artist(artistData);
        await artist.save();

        return res.send({
            artist
        });
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

export default artistsReducer;