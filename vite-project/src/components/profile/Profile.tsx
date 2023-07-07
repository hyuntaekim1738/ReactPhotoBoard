import ProfilePicture from './ProfilePicture';
import {useState} from "react";
import './Profile.css';
import EditProfile from './EditProfile';
const Profile = () => {
    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        //displays the edit profile page
        setEdit(true); 
    }

    const handleCancel = () => {
        setEdit(false);
    }
    if (edit){
        return <EditProfile onCancel={handleCancel}></EditProfile>
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <ProfilePicture></ProfilePicture>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-4">
                                <h3>Username</h3>
                            </div>
                            <div className="col">
                                <button onClick={handleEdit} className="btn btn-primary">Edit Profile</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">0 posts</div>
                            <div className="col">0 followers</div>
                            <div className="col">0 following</div>
                        </div>
                        <div className="row">
                            <div className="col">Name</div>
                        </div>
                        <div className="row">
                            <div className="col">Description/bio</div>
                        </div>
                    </div>
                    <hr className="divider"></hr>
                    <div className="row text-center">
                        <h3>Posts</h3>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;