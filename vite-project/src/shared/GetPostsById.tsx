import { getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import PostInterface from "./PostInterface.tsx";
async function GetPostsById(firebase: FirebaseApp, id: string) {
    try {
        const db = getFirestore(firebase);
        const posts = collection(db, "posts");
        const q = query(posts, where("userId", "==", id));
        const qDocs = await getDocs(q);
        //const alldocs = await getDocs(posts);
        //console.log(alldocs.docs.map((doc) => doc.data() as PostInterface));
        return qDocs.docs.map((doc) => doc.data() as PostInterface);       
    }
    catch (error) {
        console.log(error);
    }
    return [];
}
export default GetPostsById;
