import defaultProfilePicture from '../../assets/defaultProfilePicture.png';
import reactLogo from '../../assets/react.svg';
import './Post.css';
import CommentForm from './CommentForm';
import Comments from './Comments';
//tracks active image in carousel
import { useState, useEffect } from "react";
import PostInterface from "../../shared/PostInterface.tsx";
import { FirebaseApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth, User, updateEmail, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
interface Props {
    firebase: FirebaseApp;
    post: PostInterface;
}
//have it take props of a list of image sources
const Post = ({ firebase, post }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [viewComments, setViewComments] = useState(false);
    const numPhotos = post.photoUrls.length;
    const handlePrevClick = () => {
        const newIndex = (activeIndex - 1 + numPhotos) % numPhotos;
        setActiveIndex(newIndex);
    };
    const handleNextClick = () => {
        const newIndex = (activeIndex + 1) % numPhotos;
        setActiveIndex(newIndex);
    };

    const handleLike = () => {
        setLiked(!liked);
    }

    const handleComments = () => {
        setViewComments(true);
    }

    const handleX = () => {
        setViewComments(false);
    }

    //showing comments
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
                            {post.photoUrls.map((imageSrc, index) => (
                                <div key={index} className={`carousel-item ${activeIndex === index ? 'active' : ''}`}>
                                    <img src={imageSrc} className="card-img-top" alt={`carousel-item-${index}`} />
                                </div>
                            ))}
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
                    <i className="bi bi-chat" data-bs-toggle="dropdown"><span>Comment</span></i>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <CommentForm></CommentForm>
                    </ul>

                    <h5 className="card-title">Post</h5>
                    <p className="card-text">{post.caption}</p>
                </div>
                <a onClick={handleComments}>View comments</a>
                {viewComments && <Comments handleX={handleX}></Comments>}
            </div>
        </>
    );
}

export default Post;