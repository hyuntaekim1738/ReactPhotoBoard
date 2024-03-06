import AccountsList from './AccountsList';
import { FirebaseApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation } from "react-router-dom";
import { getFirestore, doc, collection, getDoc, getDocs } from 'firebase/firestore';
interface Props {
    firebase: FirebaseApp;
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

const ViewFollowers = ({ firebase }: Props) => {
    const [followers, setFollowers] = useState<string[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || null;
    useEffect(() => {
        if (id != null) {
            const fetchProfileData = async () => {
                try {
                    const db = getFirestore(firebase);
                    const profileDoc = doc(db, "profiles", id);
                    const profileSnapshot = await getDoc(profileDoc);
                    if (profileSnapshot.exists()) {
                        const gottenProfile = profileSnapshot.data() as Profile;

                            // Set followers first
                            setFollowers(gottenProfile.followers);

                            // Filter profiles where the ID is in the followers array
                            const profileDocs = await getDocs(collection(db, "profiles"));
                            const profilesData = profileDocs.docs.map((doc) => doc.data() as Profile);

                            // Use the updated followers value for filtering
                            const filteredProfiles = profilesData.filter((profile) =>
                                followers.includes(profile.id)
                            );
                            setProfiles(filteredProfiles);
                    } else {
                        console.log("Profile not found.");
                    }
                } catch (error) {
                    console.error("Error fetching profile data: ", error);
                }
            };
            fetchProfileData();
        }
        else {
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
                            const gottenProfile = profileSnapshot.data() as Profile;

                            // Set followers first
                            setFollowers(gottenProfile.followers);

                            // Filter profiles where the ID is in the followers array
                            const profileDocs = await getDocs(profilesCollection);
                            const profilesData = profileDocs.docs.map((doc) => doc.data() as Profile);

                            // Use the updated followers value for filtering
                            const filteredProfiles = profilesData.filter((profile) =>
                                followers.includes(profile.id)
                            );
                            setProfiles(filteredProfiles);
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
        }
    }, [firebase, followers]); // Add 'followers' to the dependency array

    return (
        <>
            <div className="container-fluid">
                <h1>Followers</h1>
                <AccountsList firebase={firebase} list={profiles}></AccountsList>
            </div>
        </>
    );
};

export default ViewFollowers;
