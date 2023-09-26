import express from "express";
import Album from "../modeles/Album";
import {imagesUpload} from "../multer";
import {IAlbumMutation, INewAlbums} from "../type";
import mongoose from "mongoose";
import Artist from "../modeles/Artist";
import Track from "../modeles/Track";
import auth, {IRequestWithUser} from "../midlleware/auth";
import permit from "../midlleware/permit";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        if(req.query.artist) {
            const albums = await Album.find({artist: req.query.artist}).sort({year: -1});
            const artist = await Artist.findById(req.query.artist);

            const newAlbums: INewAlbums[] = [];

            for(const alb of albums) {
                const numberOfTracks = await Track.countDocuments({album: alb._id});

                const obj = {
                    _id: String(alb._id),
                    title: alb.title,
                    artist: String(alb.artist),
                    year: alb.year,
                    image: alb.image,
                    tracks: numberOfTracks
                };
                newAlbums.push(obj);
            }

            if(!artist) {
                return res.status(401).send({error: 'No artist present!'});
            }

            const albumsInfo = {
                albums: newAlbums,
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

albumsRouter.get('/:id', async (req, res) => {
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

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const albumData: IAlbumMutation = {
        artist: req.body.artist,
        title: req.body.title,
        year: Number(req.body.year),
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

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
   try {
       const albumId = req.params.id;

       const album = await Album.findById(albumId);

       if (!album) {
           return res.status(404).json({ error: 'Album not found' });
       }


       await Album.deleteOne({ _id: album._id });

       return res.send('Album deleted!');
   } catch (e) {
       return next(e);
   }
});
export default albumsRouter;