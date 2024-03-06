import Post from './post/Post';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { useState, useEffect } from "react";
import PostInterface from "../shared/PostInterface.tsx";
import ProfileDataInterface from "../shared/ProfileDataInterface.tsx";

interface Props {
    firebase: FirebaseApp;
}
const Home = ({ firebase }: Props) => {
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const postIdsSet = new Set<string>(); 
    //get list of following
    useEffect(() => {
        const auth = getAuth(firebase);
        const fetchProfileData = onAuthStateChanged(auth, async (user) => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const db = getFirestore(firebase);
                    const profilesCollection = collection(db, "profiles");
                    const profileDoc = doc(profilesCollection, user.uid);
                    const profileSnapshot = await getDoc(profileDoc);
                    if (profileSnapshot.exists()) {
                        const gottenProfile = profileSnapshot.data() as ProfileDataInterface;
                        const posts = collection(db, "posts");
                        // Get today's date range
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const qPosts: PostInterface[] = [];
                        
                        //loop through following and get all the posts from today
                        for (let i = 0; i < gottenProfile.following.length; i++) {
                            console.log(gottenProfile.following[i]);
                            // Query the posts collection
                            const q = query(posts, where("userId", "==", gottenProfile.following[i]), where("date", ">", today), orderBy("date", "desc"));
                            const qDocs = await getDocs(q);
                            const res = qDocs.docs.map((doc) => doc.data() as PostInterface);
                            res.forEach(post => {
                                if (!postIdsSet.has(post.postId)) {
                                    qPosts.push(post);
                                    postIdsSet.add(post.postId); // Add post ID to the set
                                }
                            });
                        }
                        setPosts(prevPosts => [...prevPosts, ...qPosts]);
                    } else {
                        console.log("Profile not found.");
                    }

                } else {
                    console.log("User not logged in.");
                }
            } catch (error) {
                console.error("Error fetching profile data: ", error);
            }
        });
        fetchProfileData();
    }, [firebase]);

    //get all posts with the ids of the following and today's date sorted by most recent
    return (
        <>
            <div className="container-fluid">
                <h1>Home Page</h1>
                <div className="feed">
                    {posts.map((post) => (
                        <div className="row d-flex justify-content-center">
                            <Post firebase={firebase} post={post}></Post>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Home;