import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';

import ProfilePicture from './ProfilePicture';
import { useState, useEffect } from "react";
import './Profile.css';
import Post from '../post/Post';

interface Props {
    firebase: FirebaseApp;
}

interface ProfileData {
    id: string;
    username: string;
    description: string;
    followers: string[];
    following: string[];
    posts: string[];
    profilePhotoUrl: string;
}

const Profile = ({ firebase }: Props) => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    //fetches profile data once auth data is confirmed
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
                        setProfile(profileSnapshot.data() as ProfileData);
                    } else {
                        console.log("Profile not found.");
                    }
                } else {
                    console.log("User not logged in.");
                }
            } catch (error) {
                console.error("Error fetching profile data: ", error);
            } finally {
                setLoading(false);
            }
        });

        fetchProfileData();
    }, [firebase]);

    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>Profile not found.</div>;
    }

    const { username, description, followers, following, posts, profilePhotoUrl } = profile;
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <ProfilePicture imgLink={profilePhotoUrl}></ProfilePicture>
                    </div>
                    <div className="col">
                        <div className="row">
                            {username ? (
                                <div className="col-4">
                                    <h3>{username}</h3>
                                </div>
                            ) : (
                                <div className="col-4">
                                    <h3>Enter username</h3>
                                </div>
                            )}
                            <div className="col">
                                <a href="/editProfile" className="btn btn-primary">Edit Profile</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">{posts.length} posts</div>
                            <a href="/viewFollowers" className="col">{followers.length} followers</a>
                            <a href="/viewFollowing" className="col">{following.length} following</a>
                        </div>
                        {description ? (
                            <div className="row">
                                <div className="col">Description/bio: {description}</div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col">Enter description/bio</div>
                            </div>
                        )}
                    </div>
                    <hr className="divider"></hr>
                    <div className="row">
                        <h3>Posts</h3>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;