import defaultProfilePicture from '../../assets/defaultProfilePicture.png';
import reactLogo from '../../assets/react.svg';
import './Post.css';
//tracks active image in carousel
import { useState } from "react";
//have it take props of a list of image sources
const Post = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const handlePrevClick = () => {
        const newIndex = (activeIndex - 1 + 3) % 3; // Assumes 3 images in the carousel
        setActiveIndex(newIndex);
    };
    const handleNextClick = () => {
        const newIndex = (activeIndex + 1) % 3; // Assumes 3 images in the carousel, change this to get the length of the images prop
        setActiveIndex(newIndex);
    };

    const handleLike = () => {
        setLiked(!liked);
    }
    //the individual carousel images will change to one with the map function when the prop is passed through
    return (
        <>
            <div className="card post">
                <div className="dropdown">
                    <button className="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ...
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <li><a className="dropdown-item" href="#">Delete Post</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div className="card-carousel">
                    <div className="carousel slide">
                        <div className="carousel-inner">
                            <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
                                <img src={defaultProfilePicture} className="card-img-top" alt="..."></img>
                            </div>
                            <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
                                <img src={reactLogo} className="card-img-top" alt="..."></img>
                            </div>
                            <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
                                <img src={defaultProfilePicture} className="card-img-top" alt="..."></img>
                            </div>
                        </div>
                        <button onClick={handlePrevClick} className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button onClick={handleNextClick} className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="card-body card-text">
                    <i onClick={handleLike} className={`bi bi-heart ${liked ? 'liked' : 'not-liked'}`}></i>
                    <span>Number of likes</span>
                    <i className="bi bi-chat"></i>
                    <span>Comment</span>
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the card's content.</p>
                </div>
            </div>
        </>
    );
}

export default Post;