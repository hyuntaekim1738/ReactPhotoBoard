import Post from './post/Post';
const Home = () => {
    return (
        <>
            <div className="container-fluid">
                <h1>Home Page</h1>
                <div className="feed">
                    <div className="row d-flex justify-content-center"><Post></Post></div>
                    <div className="row d-flex justify-content-center"><Post></Post></div>
                    <div className="row d-flex justify-content-center"><Post></Post></div>
                    <div className="row d-flex justify-content-center"><Post></Post></div>
                    <div className="row d-flex justify-content-center"><Post></Post></div>
                    <div className="row d-flex justify-content-center"><Post></Post></div>
                    <div className="row d-flex justify-content-center"><Post></Post></div>
                    <div className="row d-flex justify-content-center"><Post></Post></div>
                </div>

            </div>
        </>
    )
}

export default Home;