import { useState, useEffect, useId } from "react";
import { getFirestore, doc, updateDoc, addDoc, setDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PostInterface from "../../shared/PostInterface.tsx";
import { useNavigate } from "react-router-dom";

interface Props {
    firebase: FirebaseApp;
}

//figure out how to 
const AddPost = ({ firebase }: Props) => {
    //consider making custom objects to handle the firebase data
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<PostInterface>({
        userId: "",
        postId: "",
        caption: "",
        date: new Date(),
        photos: null,
        photoUrls: []
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
        return () => unsubscribe();
    }, [firebase]); 

    const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData: PostInterface) => ({ ...prevData, [id]: value }));
    };

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files // Get the selected file from the input
        if (files) {
            console.log("Setting the post files");
            setFormData((prevData: PostInterface) => ({ ...prevData, photos: files }));
            console.log(files);
            console.log(formData.photos);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData || !formData.photos) {
            console.log("form is not working");
            return;
        }
        if (!user) {
            console.error("User is not logged in.");
            return;
        }

        try {
            const db = getFirestore(firebase);
            const postCollection = collection(db, "posts");

            //grab the postId to store in a more structured manner
            let {photos, ...postDoc } = formData;
            console.log(postDoc);
            const docRef = await addDoc(postCollection, postDoc);
            const postId = docRef.id;
            //upload images and retrieve their urls
            const photoUrls: string[] = [];
            console.log(postId);
            for (let i = 0; i < formData.photos.length; i++) {
                const storage = getStorage(firebase);
                const storageRef = ref(storage, `posts/${user.uid}/${postId}/${formData.photos[i].name}`);
                const snapshot = await uploadBytes(storageRef, formData.photos[i]);
                // Get the download URL of the uploaded image
                const downloadUrl = await getDownloadURL(snapshot.ref);
                photoUrls.push(downloadUrl);
                console.log(downloadUrl);
            }
            postDoc = {...postDoc, postId: postId, photoUrls: photoUrls};
            await updateDoc(docRef, postDoc);
            console.log("Post uploaded successfully!");
            navigate("/profile");
        } catch (error) {
            console.error("Error creating post: ", error);
        }

    };

    return (
        <>
            <div className="container-fluid">
                <h1>Add Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="file" className="form-control" id="photoUpload" accept="image/*" multiple onChange={handlePictureChange}></input>
                        <label htmlFor="photoUpload">Upload Photos:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="caption" placeholder="Enter caption" onChange={handleCaptionChange}></input>
                        <label htmlFor="captionInput">Caption:</label>
                    </div>
                    <div className="form-floating">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );

};

export default AddPost;