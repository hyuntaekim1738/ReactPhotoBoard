//firebase auth import
import { FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc} from 'firebase/firestore';
//react imports
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

//props
interface Props {
    firebase: FirebaseApp;
}

const Register = ({ firebase}: Props) => {
    const navigate = useNavigate(); //hook for redirect after registration
    //authorization auths
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    //registers user in firebase
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        console.log("handling register");
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up successfully:', userCredential.user);
            //adds user profile to profile colelction
            try {
                const db = getFirestore(firebase);
                const profilesCollection = collection(db, "profiles");
                const newProfile = {
                    id: userCredential.user.uid, // Access 'uid' from 'userCredential.user'
                    username: email.substring(0, email.indexOf('@')), // You need to define 'username', 'name', 'description' in your component state
                    description: '',
                    followers: [],
                    following: [],
                    posts: [],
                    profileUrl: ''
                };
                await setDoc(doc(profilesCollection, userCredential.user.uid), newProfile);
                console.log("Profile created successfully!");
            } catch (error) {
                console.error("Error creating profile: ", error);
            }
            navigate("/");
        }
        catch (error) {
            console.error('Error signing up:', error); // Log the entire error object
            // Perform a type assertion to access the error message
            const errorMessage = (error as { message: string }).message;
            setError(errorMessage);
        }
    };
    return (
        <div className="container-fluid">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div className="form-floating mb-3">

                    <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor="email" className="form-label">Email Address</label>
                </div>
                <div className="form-floating mb-3">

                    <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
                    <label htmlFor="password" className="form-label">Password</label>
                </div>
                <div className="form-floating mb-3">

                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                </div>
                <div className="form-floating">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
}
export default Register;