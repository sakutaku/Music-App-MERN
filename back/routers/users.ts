import express from 'express';
import mongoose from 'mongoose';
import User from '../modeles/User';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import { imagesUpload } from '../multer';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();

    await user.save();

    const answer = {
      user,
      message: 'You registered new user!',
    };

    return res.send(answer);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send({ error: 'Wrong password or username' });
  }
  try {
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send('Wrong password or username');
    }

    user.generateToken();
    await user.save();

    const answer = {
      user,
      message: 'Username and password correct!',
    };

    res.send(answer);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google Login Error!' });
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const avatar = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
        avatar,
      });
    }

    user.generateToken();
    await user.save();

    res.send({
      message: 'Login with Google successful!',
      user: user,
    });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.send({ message: 'Success' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ message: 'Success' });
    }

    user.generateToken();
    user.save();

    return res.send({ message: 'Success' });
  } catch (e) {
    next(e);
  }
});
export default usersRouter;
