import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import other page components

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
                    {authenticated && <Link className="navbar-brand" to="/">PhotoBoard</Link>}
                </div>
            </nav>
            <Routes>

            </Routes>
        </Router>
        </>
    );
};

export default Navigation;