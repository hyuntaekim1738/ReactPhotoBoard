import defaultProfilePicture from '../../assets/defaultProfilePicture.png';

const ProfilePicture = () => {
    return (
        <>
            <div className="profile-picture">
                <div className="rounded-circle">
                    <img src={defaultProfilePicture} alt="Default Profile" className="img-fluid"></img>
                </div>
            </div>
        </>
    );
}
export default ProfilePicture;