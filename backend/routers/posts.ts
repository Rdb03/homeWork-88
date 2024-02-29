import express from "express";
import Post from "../models/Post";
import dayjs from "dayjs";
import { Error } from 'mongoose';
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../midleware/auth";

const postsRouter = express.Router();

postsRouter.get('/', async (_req, res) => {
    try {
        const posts = await Post.find().sort({'date': -1}).populate('user', 'username');
        return res.send(posts);
    } catch(e) {
        return res.sendStatus(500);
    }
});

postsRouter.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'username');

        if (!post) {
            return res.sendStatus(404);
        }

        return res.send(post);
    } catch {
        return res.sendStatus(500);
    }
});

postsRouter.post('/',auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const post = new Post({
            user: user.id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
            date: dayjs(new Date().toISOString()).format('DD.MM.YYYY HH:mm'),
        });

        await post.save();
        return res.send(post);
    } catch (e) {
        if (e instanceof Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

export default postsRouter;