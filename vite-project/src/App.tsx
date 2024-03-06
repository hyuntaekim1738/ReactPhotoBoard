//css import
import './App.css'
//firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs } from 'firebase/firestore';
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

interface Profile {
  id: string;
  username: string;
  description: string;
  followers: string[];
  following: string[];
  posts: string[];
  profilePhotoUrl: string;
}

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

  //search querying
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const db = getFirestore(app); // Use your firebase app configuration
        const profilesCollection = collection(db, 'profiles');
        const profileSnapshots = await getDocs(profilesCollection);
        const profilesData = profileSnapshots.docs.map((doc) => doc.data() as Profile);
        setProfiles(profilesData);
      } catch (error) {
        console.error('Error fetching profile data: ', error);
      }
    };
    fetchProfiles();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log(searchQuery);
    setSearchQuery(searchQuery);
    window.location.href = `/searchResults?query=${encodeURIComponent(searchQuery)}`;
  };

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
                {authenticated && <NavigationLink link="/" logOut={handleLogout}>Log out</NavigationLink>}
                {!authenticated && <NavigationLink link="/login">Login</NavigationLink>}
                {!authenticated && <NavigationLink link="/register">Register</NavigationLink>}
              </ul>
              {authenticated && <div className="d-flex" >
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange}></input>
                <button className="btn btn-outline-success" onClick={handleSearch}>Search</button>
              </div>}
            </div>
          </div>
        </nav>
        <Routes>
          {!authenticated && <Route path="/" element={<Login />} />}
          {authenticated && <Route path="/" Component={Home} />}
          <Route path="/addPost" element={<AddPost firebase={app}></AddPost>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile firebase={app} />} />
          <Route path="/editProfile" element={<EditProfile firebase={app} />} />
          <Route path="/register" element={<Register firebase={app} />} />
          <Route path="/searchResults" element={<SearchResults firebase={app} list={profiles} />} />
          <Route path="/viewFollowers" element={<ViewFollowers firebase={app}/>} />
          <Route path="/viewFollowing" element={<ViewFollowing firebase={app}/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
