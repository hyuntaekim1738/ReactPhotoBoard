
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationLink from './NavigationLink';
import './Navigation.tsx';
//page components sort alphabetically
import AddPost from '../post/AddPost';
import Login from '../authentication/Login';
import Profile from '../profile/Profile';
import Register from '../authentication/Register';
import SearchResults from '../accountsList/SearchResults';
import ViewFollowers from '../accountsList/ViewFollowers';
import ViewFollowing from '../accountsList/ViewFollowing';
import ViewRequests from '../accountsList/ViewRequests';
import Home from '../Home';
interface Props {
    //a boolean that will control which links are displayed
    authenticated: boolean;
}

const Navigation = ({ authenticated }: Props) => {
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
                                {authenticated && <NavigationLink link="/">Log out</NavigationLink>}
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
                    {!authenticated && <Route path="/" Component={Login} />}
                    {authenticated && <Route path="/" Component={Home} />}
                    <Route path="/addPost" Component={AddPost} />
                    <Route path="/login" Component={Login} />
                    <Route path="/profile" Component={Profile} />
                    <Route path="/register" Component={Register} />
                    <Route path="/viewRequests" Component={ViewRequests} />
                    <Route path="/searchResults" Component={SearchResults}/>
                    <Route path="/viewFollowers" Component={ViewFollowers}/>
                    <Route path="/viewFollowing" Component={ViewFollowing}/>
                </Routes>
            </Router>
        </>
    );
};

export default Navigation;