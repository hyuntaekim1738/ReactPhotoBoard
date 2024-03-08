import './Post.css';
import CommentForm from './CommentForm';
import Comments from './Comments';
import { useState, useEffect } from "react";
import PostInterface from "../../shared/PostInterface.tsx";
import { FirebaseApp } from "firebase/app";

import { getFirestore, doc, deleteDoc, collection, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getAuth, User } from "firebase/auth";
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
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const numPhotos = post.photoUrls.length;

    const db = getFirestore(firebase);

    useEffect(() => {
        const auth = getAuth(firebase);
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                if (currentUser.uid in post.likes) {
                    setLiked(true);
                }
            } else {
                setUser(null);
            }

        });
        return () => unsubscribe();
    }, [firebase]); 


    const handlePrevClick = () => {
        const newIndex = (activeIndex - 1 + numPhotos) % numPhotos;
        setActiveIndex(newIndex);
    };
    const handleNextClick = () => {
        const newIndex = (activeIndex + 1) % numPhotos;
        setActiveIndex(newIndex);
    };

    const handleLike = async () => {
        if (!user) {
            console.log("user isn't logged in.");
            return;
        }
        if (liked) {
            post.likes.splice(post.likes.indexOf(user.uid), 1);
        }
        else { //add to the array
            post.likes.push(user.uid);
        }
        setLiked(!liked);
        //update in firebase
        const {photos, ...postDoc} = post;
        const db = getFirestore(firebase);
        const docRef = doc(db, "posts", post.postId);
        await updateDoc(docRef, postDoc);
    };

    const handleComments = () => {
        setViewComments(true);
    };

    const handleX = () => {
        setViewComments(false);
    };

    const handleDelete = async () => {
        if (!user) {
            console.log("User is null right now so you cannot delete the post");
            return;
        }
        const storage = getStorage(firebase);
        for (let i = 0; i < post.photoUrls.length; i++) {
            // Create a reference to the file to delete
            const picRef = ref(storage, `posts/${user.uid}/${post.postId}/${post.photoNames[i]}`);

            // Delete the file
            deleteObject(picRef).then(() => {
                console.log("post " + i + " deleted successfully");
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log("An error occured deleting the photos of the post");
            });
        }
        await deleteDoc(doc(db, "posts", post.postId));
        window.location.reload(); //temporary solution to show deletion, find a way to fix this
    };
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
                        {user && post.userId == user.uid && <li><a className="dropdown-item" href="#" onClick={handleDelete}>Delete Post</a></li>}
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
                    <span>{post.likes.length} likes</span>
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