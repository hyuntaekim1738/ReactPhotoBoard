import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { useLocation } from "react-router-dom";
import ProfilePicture from './ProfilePicture';
import { useState, useEffect } from "react";
import './Profile.css';
import Post from '../post/Post';

interface Props {
    firebase: FirebaseApp;
}
//add an if statement to followers so it knows what to redirect for when there is a seperate profile
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
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || null;
    //fetches profile data once auth data is confirmed
    useEffect(() => {
        //for when we are viewing another person's profile
        if (id != null) {
            const fetchProfileData = async () => {
                try {
                    const db = getFirestore(firebase);
                    const profilesCollection = collection(db, "profiles");
                    const profileDoc = doc(profilesCollection, id);
                    const profileSnapshot = await getDoc(profileDoc);
                    if (profileSnapshot.exists()) {
                        setProfile(profileSnapshot.data() as ProfileData);
                    } else {
                        console.log("Profile not found.");
                    }
                } catch (error) {
                    console.error("Error fetching profile data: ", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProfileData();
        }
        //for when we are viewing the main user's profile
        else {
            const auth = getAuth(firebase);

            const fetchProfileData = onAuthStateChanged(auth, async (user) => {

                try {
                    const user = auth.currentUser;
                    if (user) {
                        const db = getFirestore(firebase);
                        const profileDoc = doc(db, "profiles", user.uid);
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
        }
    }, [firebase]);



if (loading) {
    return <div>Loading...</div>;
}

if (!profile) {
    return <div>Profile not found.</div>;
}

const { username, description, followers, following, posts, profilePhotoUrl } = profile;
const clickFollowers = (profileId: string) => {
    window.location.href = `/viewFollowers?id=${encodeURIComponent(profileId)}`;
    };
    const clickFollowing = (profileId: string) => {
        window.location.href = `/viewFollowing?id=${encodeURIComponent(profileId)}`;
        };return (
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
                        {!id &&
                            <div className="col">
                                <a href="/editProfile" className="btn btn-primary">Edit Profile</a>
                            </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col">{posts.length} posts</div>
                        {!id && <a href="/viewFollowers" className="col">{followers.length} followers</a> }
                        {id && <a onClick={() => clickFollowers(id)} className="col">{followers.length} followers</a>}
                        {!id && <a href="/viewFollowing" className="col">{following.length} following</a> }
                        {id && <a onClick={() => clickFollowing(id)} className="col">{following.length} following</a>}
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