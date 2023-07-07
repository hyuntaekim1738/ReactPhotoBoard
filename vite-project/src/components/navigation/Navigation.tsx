
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationLink from './NavigationLink';
import './Navigation.tsx';
//page components sort alphabetically
import Login from '../authentication/Login';
import Profile from '../profile/Profile';
import Register from '../authentication/Register';

interface Props{
    //a boolean that will control which links are displayed
    authenticated: boolean;
}

const Navigation = ({authenticated}: Props) => {
    return (
        <>
        <Router>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {<NavigationLink navBrand={true}></NavigationLink>}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {authenticated && <NavigationLink link="/">Post</NavigationLink>}
                            {authenticated && <NavigationLink link="/profile">Profile</NavigationLink>}
                            {authenticated && <NavigationLink link="/">Follow Requests</NavigationLink>}
                            {authenticated && <NavigationLink link="/">Log out</NavigationLink>}
                            {!authenticated && <NavigationLink link="/login">Login</NavigationLink>}
                            {!authenticated && <NavigationLink link="/register">Register</NavigationLink>}
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                {!authenticated && <Route path="/" Component={Login}/>}
                <Route path="/login" Component={Login} />
                <Route path="/profile" Component={Profile}/>
                <Route path="/register" Component={Register}/>
            </Routes>
        </Router>
        </>
    );
};

export default Navigation;