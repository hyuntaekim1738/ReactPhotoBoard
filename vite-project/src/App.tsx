//css import
import './App.css'
//firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
//react imports
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//page components
import AddPost from './components/post/AddPost';
import Home from './components/Home';
import Login from './components/authentication/Login';
import NavigationLink from './NavigationLink';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Register from './components/authentication/Register';
import SearchResults from './components/accountsList/SearchResults';
import ViewFollowers from './components/accountsList/ViewFollowers';
import ViewFollowing from './components/accountsList/ViewFollowing';
import ViewRequests from './components/accountsList/ViewRequests';

function App() {
  //firebase configuration and set up
  const config = {
    apiKey: "AIzaSyAMK2R14jfDVss0kGM_uZYdIvbzSV9OB2I",
    authDomain: "reactphotoboard.firebaseapp.com",
    projectId: "reactphotoboard",
    storageBucket: "reactphotoboard.appspot.com",
    messagingSenderId: "491606319211",
    appId: "1:491606319211:web:f9f8dbb77a8e0b84c7912e",
    measurementId: "G-V6D9JM11EG"
  }
  const app = initializeApp(config);

  //authentication state
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const auth = getAuth(app);
    
    // Set up the listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user is authenticated");
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

    //logout function passed to logout link
    const handleLogout = async () => {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log('User logged out successfully.');
        setAuthenticated(false); // Update the authenticated state to indicate the user is logged out
      }
      catch (error) {
        console.error('Error logging out:', error);
      }
    }

    return (
      <>
        <Router>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              {<NavigationLink navBrand={true}></NavigationLink>}
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {authenticated && <NavigationLink link="/">Home</NavigationLink>}
                  {authenticated && <NavigationLink link="/addPost">Add Post</NavigationLink>}
                  {authenticated && <NavigationLink link="/profile">Profile</NavigationLink>}
                  {authenticated && <NavigationLink link="/viewRequests">Follow Requests</NavigationLink>}
                  {authenticated && <NavigationLink link="/" logOut={handleLogout}>Log out</NavigationLink>}
                  {!authenticated && <NavigationLink link="/login">Login</NavigationLink>}
                  {!authenticated && <NavigationLink link="/register">Register</NavigationLink>}
                </ul>
                {authenticated && <form className="d-flex" role="search" action="/searchResults">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>}
              </div>
            </div>
          </nav>
          <Routes>
            {!authenticated && <Route path="/" element={<Login />} />}
            {authenticated && <Route path="/" Component={Home} />}
            <Route path="/addPost" Component={AddPost} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile firebase={app} />} />
            <Route path="/editProfile" element={<EditProfile firebase={app}/>} />
            <Route path="/register" element={<Register firebase={app} />} />
            <Route path="/viewRequests" Component={ViewRequests} />
            <Route path="/searchResults" Component={SearchResults} />
            <Route path="/viewFollowers" element={<ViewFollowers />} />
            <Route path="/viewFollowing" element={<ViewFollowing />} />
          </Routes>
        </Router>

      </>
    )
  }

export default App
