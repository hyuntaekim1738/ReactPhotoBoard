import Post from './post/Post';

const Home = () => {
    return (
        <>
        <div className="container-fluid">
            <h1>Home Page</h1>
            <div className="feed">
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
            </div>
        </div>
        </>
    )
}

export default Home;