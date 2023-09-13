import mongoose from 'mongoose';
import Album from "./Album";

const TrackSchema = new mongoose.Schema({
    album: {
        type: mongoose.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => {
                await Album.findById(value);
            },
            message: 'Album does not exist!',
        }
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: Number,
        required: true
    },
    duration: String,
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;