import { Link } from 'react-router-dom';

//maybe add in a variable that tells you which page you're on so that the active link highlights
interface Props{
    navBrand?: boolean;
    children?: string; //passes in the link name
    link?: string;
    onClickLink?: () => void;
}
const NavigationLink = ({navBrand=false, children, link, onClickLink}: Props) => {
    if (navBrand){
        return (
            <Link className="navbar-brand" to="/">PhotoBoard</Link>
        );
    }
    else{
        return (
            <li className="nav-item">
                <Link className="nav-link" to={link} onClick={onClickLink}>{children}</Link>
            </li>
        );
    }
}

export default NavigationLink;