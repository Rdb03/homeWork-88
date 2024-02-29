import mongoose from 'mongoose';
import User from "./User";
import Post from "./Post";

const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await Post.findById(value),
            message: 'Post does not exist!',
        }
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'User does not exist!',
        }
    },
    title: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;