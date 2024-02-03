import { useState, useEffect } from "react";
import { FirebaseApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth, User, updateEmail, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Props {
    firebase: FirebaseApp;
}

interface ProfileData {
    username: string;
    email: string;
    password: string;
    description: string;
    profilePhotoUrl: string;
    profileFile: File | null;
}

const EditProfile = ({ firebase }: Props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<ProfileData>({
        username: "",
        email: "",
        password: "",
        description: "",
        profilePhotoUrl: "",
        profileFile: null
    });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the selected file from the input
        if (file) {
            // Store the selected file in the state
            console.log("Setting profile url");
            setFormData((prevData) => ({ ...prevData, profileFile: file }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //checks for user authentication

        if (!user) {
            console.error("User is not logged in.");
            setError("User is not logged in.");
            return;
        }

        const firestore = getFirestore(firebase);
        try {
            // Get the existing user data from Firestore
            const profilesCollection = collection(firestore, "profiles");
            const profileDoc = doc(profilesCollection, user.uid);
            let userSnap = await getDoc(profileDoc);
            if (userSnap.exists()) {
                // Update email and password if they are changed in the form
                if (formData.email !== user.email && formData.email.trim() != "") {
                    await updateEmail(user, formData.email);
                    console.log("Email updated");
                }
                if (formData.password !== "") {
                    await updatePassword(user, formData.password);
                    console.log("Password updated");
                }
                let existingData = userSnap.data() as ProfileData;

                // If the profilePhotoUrl in formData is a File, upload it to Firebase Storage
                if (formData.profileFile instanceof File) {
                    const storage = getStorage(firebase);
                    const storageRef = ref(storage, `profilePictures/${user.uid}/${formData.profileFile.name}`);
                    const snapshot = await uploadBytes(storageRef, formData.profileFile);

                    // Get the download URL of the uploaded image
                    const downloadUrl = await getDownloadURL(snapshot.ref);
                    console.log("profile picture updated");
                    console.log(downloadUrl);
                    const updatedData = {
                        ...existingData,
                        profilePhotoUrl: downloadUrl
                    };
                    await updateDoc(profileDoc, updatedData);
                }
                // Merge the existing data with the new form data (except email and password fields)
                if (existingData.profilePhotoUrl && formData.profilePhotoUrl) {
                    const storage = getStorage(firebase);
                    const oldStorageRef = ref(storage, existingData.profilePhotoUrl);
                    await deleteObject(oldStorageRef);
                    console.log("Deleting old profile");
                }
                //fetch the updated data after profile picture change
                userSnap = await getDoc(profileDoc);
                existingData = userSnap.data() as ProfileData;
                const updatedData = {
                    ...existingData,
                    username: formData.username || existingData.username,
                    description: formData.description || existingData.description,
                };
                await updateDoc(profileDoc, updatedData);
                console.log("Profile updated successfully!");
                setError("");
            }
            navigate("/profile");
        } catch (error) {
            const errorMessage = (error as { message: string }).message;
            setError(errorMessage);
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="container-fluid">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="file" className="form-control" id="fileInput" accept=".jpg,.png,.pdf" onChange={handleProfilePicChange}></input>
                    <label htmlFor="fileInput">Change Profile Picture: </label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" onChange={handleInputChange}></input>
                    <label htmlFor="email" className="form-label">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="username" className="form-control" id="username" onChange={handleInputChange}></input>
                    <label htmlFor="username" className="form-label">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="description" onChange={handleInputChange}></input>
                    <label htmlFor="description" className="form-label">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" onChange={handleInputChange}></input>
                    <label htmlFor="password" className="form-label">Password</label>
                </div>
                <div className="form-floating">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <a href="/profile" className="btn btn-light">Cancel</a>
                </div>
            </form>
            {error && <div>{error}</div>}
        </div>
    )
}
export default EditProfile;