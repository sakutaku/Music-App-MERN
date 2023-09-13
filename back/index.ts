import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import artistsReducer from "./routers/artists";
import albumsReducer from "./routers/albums";
import tracksReducer from "./routers/tracks";
import usersRouter from "./routers/users";
import tracksHistoryRouter from "./routers/tracksHistory";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/artists', artistsReducer);
app.use('/albums', albumsReducer);
app.use('/tracks', tracksReducer);
app.use('/users', usersRouter);
app.use('/track_history', tracksHistoryRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/shop');

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));