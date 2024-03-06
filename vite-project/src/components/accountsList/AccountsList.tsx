import ProfilePicture from '../profile/ProfilePicture';
import { useEffect, useState } from 'react';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';

interface Props {
    firebase: FirebaseApp;
    list: Profile[];
}

interface Profile {
    id: string;
    username: string;
    description: string;
    followers: string[];
    following: string[];
    posts: string[];
    profilePhotoUrl: string;
}
const AccountsList = ({ firebase, list }: Props) => {
    //get the user and if the displayed profile is in their following, display the unfollow button otherwise display follow
    //fetches profile data once auth data is confirmed
    const [user, setUser] = useState<User | null>(null);
    const [following, setFollowing] = useState<string[]>([]);
    useEffect(() => {
        const auth = getAuth(firebase);
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Clean up the listener when the component unmounts
    }, [firebase]);

    useEffect(() => {
        const auth = getAuth(firebase);

        const fetchProfileData = onAuthStateChanged(auth, async (user) => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const db = getFirestore(firebase);
                    const profileDoc = doc(db, "profiles", user.uid);
                    const profileSnapshot = await getDoc(profileDoc);
                    if (profileSnapshot.exists()) {
                        const gottenProfile = profileSnapshot.data() as Profile;
                        setFollowing(gottenProfile.following);
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

    const isFollowing = (profileId: string) => {
        return following.includes(profileId);
    };

    //link to clicking on other's profile
    const clickProfile = (profileId: string) => {
    window.location.href = `/profile?id=${encodeURIComponent(profileId)}`;
    };

    // Function to handle following a profile
    const handleFollow = async (profileId: string) => {
        const firestore = getFirestore(firebase);
        try {
            if (!user) {
                console.error("User is not logged in.");
                return;
            }
            const profilesCollection = collection(firestore, "profiles");
            const profileDoc = doc(profilesCollection, user.uid);
            let userSnap = await getDoc(profileDoc);
            if (userSnap.exists()) {
                const existingData = userSnap.data() as Profile;
                // Add the current user's ID to the following list
                const updatedFollowing = [...existingData.following, profileId];
                const updatedData = {
                    ...existingData,
                    following: updatedFollowing,
                }
                await updateDoc(profileDoc, updatedData);
                console.log("Profile updated successfully!");
                setFollowing(updatedFollowing);
            }
            //adds the user's id to the followed, followers
            const followedDoc = doc(profilesCollection, profileId);
            const followedSnap = await getDoc(followedDoc);
            if (followedSnap.exists()){
                const existingData = followedSnap.data() as Profile;
                const updatedFollowers = [...existingData.followers, user.uid];
                const updatedData = {
                    ...existingData,
                    followers: updatedFollowers,
                }
                await updateDoc(followedDoc, updatedData);
            }
        }
        catch (error) {
            console.error("Error updating profile:", error);
        }
    };


    // Function to handle unfollowing a profile
    const handleUnfollow = async (profileId: string) => {

        const firestore = getFirestore(firebase);
        try {
            if (!user) {
                console.error("User is not logged in.");
                return;
            }
            const profilesCollection = collection(firestore, "profiles");
            const profileDoc = doc(profilesCollection, user.uid);
            let userSnap = await getDoc(profileDoc);
            if (userSnap.exists()) {
                const existingData = userSnap.data() as Profile;
                // Remove the current user's ID from the following list
                const updatedFollowing = existingData.following.filter(
                    (id) => id !== profileId
                );
                const updatedData = {
                    ...existingData,
                    following: updatedFollowing,
                }
                await updateDoc(profileDoc, updatedData);
                console.log("Profile updated successfully!");
                setFollowing(updatedFollowing);
            }
            //removes the user's id from the followed, followers
            const followedDoc = doc(profilesCollection, profileId);
            const followedSnap = await getDoc(followedDoc);
            if (followedSnap.exists()){
                const existingData = followedSnap.data() as Profile;
                const updatedFollowers = existingData.following.filter(
                    (id) => id !== user.uid
                );
                const updatedData = {
                    ...existingData,
                    followers: updatedFollowers,
                }
                await updateDoc(followedDoc, updatedData);
            }
        }
        catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Account</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((profile) => (
                        <tr key={profile.username}>
                            <td>
                                <ProfilePicture imgLink={profile.profilePhotoUrl} />
                            </td>
                            <td><a onClick={() => clickProfile(profile.id)}>{profile.username}</a></td>
                            <td>
                                {isFollowing(profile.id) ? (
                                    <button className="btn btn-secondary" onClick={() => handleUnfollow(profile.id)}>Unfollow</button>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => handleFollow(profile.id)}>Follow</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default AccountsList;