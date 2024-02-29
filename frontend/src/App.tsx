import './App.css'
import Header from "./components/Header/Header.tsx";
import NewPost from "./containers/posts/NewPost.tsx";
import {Route, Routes} from "react-router-dom";
import FullPost from "./containers/fullPost/FullPost.tsx";
import Login from "./containers/users/Login.tsx";
import Register from "./containers/users/Register.tsx";
import Posts from "./containers/posts/Posts.tsx";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={(
                    <Posts/>
                )}/>
                <Route path="/register" element={(
                    <Register/>
                )}/>
                <Route path="/login" element={(
                    <Login/>
                )}/>
                <Route path="/fullpost/:id" element={(
                    <FullPost/>
                )}/>
                <Route path="/newpost" element={(
                    <NewPost/>
                )}/>
            </Routes>
        </div>
    );
};

export default App
