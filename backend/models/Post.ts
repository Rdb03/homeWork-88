import mongoose, {HydratedDocument} from 'mongoose';
import User from "./User";
import {IPost} from "../type";

const PostSchema = new mongoose.Schema({
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
    },
    description: {
        type: String,
        validate: {
            validator: function (this: HydratedDocument<IPost>) {
                return this.image || this.description
            },
            message: 'Description or image must be filled in!'
        }
    },
    image: {
        type: String,
        validate: {
            validator: function (this: HydratedDocument<IPost>){
                return this.description || this.image;
            },
            message: 'Description or image must be filled in!'
        }
    },
    date: String,
});

const Post = mongoose.model('Post', PostSchema);

export default Post;