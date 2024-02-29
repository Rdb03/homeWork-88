import express from 'express';
import Comment from '../models/Comment';
import { Error } from 'mongoose';
import auth, {RequestWithUser} from "../midleware/auth";
const commentsRouter = express.Router();

commentsRouter.post('/',auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const comment = new Comment({
            user: user.id,
            post: req.body.post,
            title: req.body.title
        });

        await comment.save();

        return res.send(comment);
    } catch (e) {
        if (e instanceof Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

commentsRouter.get('/', async (req, res) => {
    try {
        const post = req.query.post_id as string;

        if (!post) {
            const comments = await Comment.find().populate('user', 'username');
            return res.send(comments);
        }

        const comments = await Comment.find({ post: {_id: post} }).populate('user', 'username');

        return res.send(comments);
    } catch {
        return res.sendStatus(500);
    }
});

export default commentsRouter;