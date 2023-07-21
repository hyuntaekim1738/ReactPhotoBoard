//firebase auth import
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//react imports
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

//props
interface Props {
    setAuthenticated: (registered: boolean) => void;
}

const Login = ({setAuthenticated}: Props) => {
    const navigate = useNavigate(); //hook for redirect after login
    //authorization auths
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //registers user in firebase
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("handling register");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully:', userCredential.user);
            setAuthenticated(true);
            navigate("/");
        } 
        catch (error) {
            console.error('Error signing in:', error); // Log the entire error object
            const errorMessage = (error as { message: string }).message;
            setError(errorMessage);
        }
    };

    return (
        <div className="container-fluid">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor="email" className="form-label">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
                    <label htmlFor="password" className="form-label">Password</label>
                </div>
                <div className="form-floating">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
}
export default Login;