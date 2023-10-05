import mongoose from 'mongoose';
import Artist from './Artist';
import User from './User';

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
  year: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: String,
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;
