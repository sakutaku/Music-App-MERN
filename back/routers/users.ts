import express from "express";
import mongoose from "mongoose";
import User from "../modeles/User";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();

        await user.save();

        return res.send(user);
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) =>{
    const user = await User.findOne({username: req.body.username});

    if(!user) {
        return res.status(401).send({error: 'Wrong password or username'});
    }
    try {
        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch) {
            return res.status(401).send('Wrong password or username');
        }

        user.generateToken();
        await user.save();
        res.send({message: 'Username and password correct!'});
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});
export default usersRouter;

