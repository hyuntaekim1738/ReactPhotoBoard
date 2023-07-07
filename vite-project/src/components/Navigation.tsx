
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import other page components
import NavigationLink from './NavigationLink';
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
                    {authenticated && <NavigationLink navBrand={true}></NavigationLink>}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {authenticated && <NavigationLink link="/">Post</NavigationLink>}
                            {authenticated && <NavigationLink link="/">Profile</NavigationLink>}
                            {authenticated && <NavigationLink link="/">Follow Requests</NavigationLink>}
                            {authenticated && <NavigationLink link="/">Log out</NavigationLink>}
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>

            </Routes>
        </Router>
        </>
    );
};

export default Navigation;