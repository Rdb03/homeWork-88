import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import crypto from "crypto";
import Comment from "./models/Comment";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['users', 'posts', 'comments'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2] = await User.create({
        username: 'Rdb03',
        password: '12356',
        token: crypto.randomUUID()
    }, {
        username: 'User',
        password: '123456',
        token: crypto.randomUUID()
    });

    const [post1, post2] = await Post.create({
        title: 'test post 1',
        description: 'description admin post',
        image: 'images/post1.png',
        date: '14.05.28',
        user: user1._id
    }, {
        title: 'test post 2',
        description: 'description user post',
        image: 'images/post2.jpg',
        date: '14.05.48',
        user: user2._id
    });

    await Comment.create({
        title: 'User1 comment 1',
        post: post1._id,
        user: user1._id,
    }, {
        title: 'User1 comment 2',
        post: post2._id,
        user: user1._id,
    }, {
        title: 'Use2r comment 1',
        post: post1._id,
        user: user2._id,
    }, {
        title: 'User2 comment 2',
        post: post2._id,
        user: user2._id,
    });


    await db.close();
};

void run();