import mongoose from 'mongoose';
import User from "./User";
import Track from "./Track";


const TrackHistorySchema = new mongoose.Schema({
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
    track: {
        type: mongoose.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => {
                await Track.findById(value);
            },
            message: 'Track does not exist!',
        }
    },
    datetime: {
        type: String,
        required: true,
    },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;