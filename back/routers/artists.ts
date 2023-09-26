import express from "express";
import Artist from "../modeles/Artist";
import {imagesUpload} from "../multer";
import {IArtistMutation} from "../type";
import mongoose from "mongoose";
import auth from "../midlleware/auth";
import permit from "../midlleware/permit";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
        return res.status(500).send('Error');
    }
});


artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
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

artistsRouter.delete('/:id',auth, permit('admin'), async (req, res, next) => {
   try {
       const artistId = req.params.id;

       const artist = await Artist.findById(artistId);

       if (!artist) {
           return res.status(404).json({ error: 'Artist not found' });
       }


       await Artist.deleteOne({ _id: artist._id });

       return res.send('Artist deleted!');
   } catch (e) {
       return next(e);
   }
});

export default artistsRouter;