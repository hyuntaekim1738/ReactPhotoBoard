import { getFirestore, doc, arrayUnion, updateDoc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { useState } from "react";

interface Props {
    firebase: FirebaseApp;
    postId: string;
}

const CommentForm = ({ firebase, postId }: Props) => {
    const [comment, setComment] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const firestore = getFirestore(firebase);
        console.log(comment);
        const postDoc = doc(firestore, "posts", postId);
        const currentDate = new Date().toLocaleString();
        await updateDoc(postDoc, {
            comments: arrayUnion(`${currentDate}\\ ${comment}`)
        });
        window.location.reload(); //fix this
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Enter comment" onChange={handleInputChange}></input>
                    <label htmlFor="floatingInput">Comment</label>
                </div>
                <div className="form-floating">
                    <button type="submit" className="btn btn-primary">Comment</button>
                </div>
            </form>
        </>
    );
}

export default CommentForm;