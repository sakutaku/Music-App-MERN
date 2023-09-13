import mongoose from 'mongoose';
import Artist from "./Artist";

const AlbumSchema = new mongoose.Schema({
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => {
                await Artist.findById(value);
            },
            message: 'Artist does not exist!',
        }
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    year: {
        type: String,
        required: true,
    },
    image: String,
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;