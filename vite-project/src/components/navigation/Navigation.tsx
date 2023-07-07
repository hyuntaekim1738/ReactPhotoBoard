
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationLink from './NavigationLink';
//page components sort alphabetically
import Login from '../Login';
import Profile from '../Profile';
import Register from '../Register';

interface Props{
    //a boolean that will control which links are displayed
    authenticated: boolean;
    //this passes in the onclick function from app to each individual link
    onClickLink: () => void;
}

const Navigation = ({authenticated, onClickLink}: Props) => {
    return (
        <>
        <Router>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {<NavigationLink navBrand={true}></NavigationLink>}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {authenticated && <NavigationLink onClickLink={onClickLink} link="/">Post</NavigationLink>}
                            {authenticated && <NavigationLink onClickLink={onClickLink} link="/profile">Profile</NavigationLink>}
                            {authenticated && <NavigationLink onClickLink={onClickLink} link="/">Follow Requests</NavigationLink>}
                            {authenticated && <NavigationLink onClickLink={onClickLink} link="/">Log out</NavigationLink>}
                            {!authenticated && <NavigationLink onClickLink={onClickLink} link="/login">Login</NavigationLink>}
                            {!authenticated && <NavigationLink onClickLink={onClickLink} link="/register">Register</NavigationLink>}
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/profile" Component={Profile}/>
                <Route path="/register" Component={Register}/>
            </Routes>
        </Router>
        </>
    );
};

export default Navigation;