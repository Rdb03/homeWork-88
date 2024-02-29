import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import PostItem from "./components/PostItem.tsx";
import {selectPosts, selectPostsLoading} from "./postsSlice.ts";
import {useEffect} from "react";
import {fetchPosts} from "./postsThunk.ts";
import {CircularProgress} from "@mui/material";

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const loading = useAppSelector(selectPostsLoading);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return loading ? <CircularProgress/> : (
        <div className="posts">
            <div className="posts-list">
                {posts.map(item => (
                    <PostItem
                        key={item._id}
                        title={item.title}
                        image={item.image}
                        id={item._id}
                        date={item.date}
                        user={item.user}
                    />
                ))}
            </div>
        </div>
    );
}

export default Posts;