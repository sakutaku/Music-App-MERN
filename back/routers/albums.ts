import express from "express";
import Album from "../modeles/Album";
import {imagesUpload} from "../multer";
import {IAlbumMutation} from "../type";
import mongoose from "mongoose";
import Track from "../modeles/Track";
import Artist from "../modeles/Artist";

const albumsReducer = express.Router();

albumsReducer.get('/', async (req, res) => {
    try {
        if(req.query.artist) {
            const albums = await Album.find({artist: req.query.artist}).sort({year: -1});
            const artist = await Artist.findById(req.query.artist);

            if(!artist) {
                return res.status(401).send({error: 'No artist present!'});
            }

            const albumsInfo = {
                albums,
                artist: artist.title,
            };

            res.send(albumsInfo);
        } else {
            const albums = await Album.find();
            return res.send(albums);
        }
    } catch (e) {
        return res.status(500).send('Error');
    }
});

albumsReducer.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');

        if(!album) {
            return res.status(404).send('Not found!');
        }

        return res.send(album);
    } catch {
        return res.status(500).send('Error!');
    }
});

albumsReducer.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const albumData: IAlbumMutation = {
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        image: req.file ? req.file.filename : null,
    };

    try {
        const album = new Album(albumData);
        await album.save();

        return res.send({
            album
        });
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});
export default albumsReducer;