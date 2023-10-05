import mongoose from 'mongoose';
import Album from './Album';
import User from './User';

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
    },
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        await User.findById(value);
      },
      message: 'User does not exist!',
    },
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  duration: String,
  link: String,
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;
