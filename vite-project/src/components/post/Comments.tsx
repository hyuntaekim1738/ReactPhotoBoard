//this page will be the comments display list featuring the comment form, the caption, and every comment using a table
import CommentForm from './CommentForm';
import { FirebaseApp } from "firebase/app";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from "react";
import PostInterface from "../../shared/PostInterface.tsx";

interface Props {
    handleX: () => void;
    firebase: FirebaseApp;
    postId: string;
}

const Comments = ({ handleX, firebase, postId }: Props) => {
    const [comments, setComments] = useState<string[]>([]);

    useEffect(() => {
        //for when we are viewing another person's profile
        const fetchComments = async () => {
            const firestore = getFirestore(firebase);
            const postDoc = doc(firestore, "posts", postId);
            const post = (await getDoc(postDoc)).data() as PostInterface;

            const sortedComments = post.comments.sort((a, b) => {
                const dateA = new Date(a.split('\\ ')[0]);
                const dateB = new Date(b.split('\\ ')[0]);
                return dateB.getTime() - dateA.getTime(); // Sort in descending order by timestamp
            });
            setComments(sortedComments);
        }
        fetchComments();
    }, [firebase]);

    return (
        <>
            <div className="overlay">
                <div className="partial-window comment-pane container-fluid">
                    <CommentForm firebase={firebase} postId={postId}></CommentForm>
                    <button className="btn btn-danger close-button" onClick={handleX}>X</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comment, index) => {
                                const [date, content] = comment.split('\\ '); // Split comment into date and content
                                return (
                                    <tr>
                                        <td>{date}</td>
                                        <td>{content}</td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Comments;