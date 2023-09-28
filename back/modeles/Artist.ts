import mongoose from 'mongoose';
import User from "./User";

const ArtistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => {
                await User.findById(value);
            },
            message: 'User does not exist!',
        }
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
    image: String,
    description: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;