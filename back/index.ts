import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routers/users';
import tracksHistoryRouter from './routers/tracksHistory';
import config from './config';
import tracksRouter from './routers/tracks';
import albumsRouter from './routers/albums';
import artistsRouter from './routers/artists';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', tracksHistoryRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.error(e));
