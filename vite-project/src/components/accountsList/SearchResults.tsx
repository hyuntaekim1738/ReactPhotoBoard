import AccountsList from './AccountsList';
import { useLocation } from 'react-router-dom';
import {FirebaseApp } from 'firebase/app';
interface Props{
    firebase: FirebaseApp;
    list: Profile[];
}

interface Profile{
    id: string;
    username: string;
    description: string;
    followers: string[];
    following: string[];
    posts: string[];
    profilePhotoUrl: string;
}
const SearchResults = ({firebase, list}: Props) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    // Filter the list based on the query (if it exists)
    const filteredList = query
        ? list.filter(profile => profile.username.toLowerCase().includes(query.toLowerCase()))
        : list;
    

    return (
        <>
            <div className="container-fluid">
                <h1>Search Results</h1>
                <AccountsList firebase={firebase} list={filteredList || list}></AccountsList>
            </div>
        </>
    );
}
export default SearchResults;