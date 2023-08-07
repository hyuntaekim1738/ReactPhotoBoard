import AccountsList from './AccountsList';
import { FirebaseApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
const ViewFollowing = ({firebase}: Props) => {
    const [following, setFollowing] = useState<string[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
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
                        const gottenProfile = profileSnapshot.data() as Profile;
                        setFollowing(gottenProfile.following);
                        // Filter profiles where the ID is in the following array
                        const profileDocs = await getDocs(profilesCollection);
                        const filteredProfiles = profileDocs.docs
                            .map((doc) => doc.data() as Profile)
                            .filter((profile) => following.includes(profile.id));
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
    }, [firebase, following]);
    return (
        <>
            <div className="container-fluid">
                <h1>Following</h1>
                <AccountsList firebase={firebase} list={profiles}></AccountsList>
            </div>
        </>
    )
}
export default ViewFollowing;