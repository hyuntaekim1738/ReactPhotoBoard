import defaultProfilePicture from '../../assets/defaultProfilePicture.png';

interface Props{
    imgLink?: string;
}
const ProfilePicture = ({imgLink}: Props) => {
    const imageSize = 150;
    const imageStyle = {
        background: `url(${imgLink || defaultProfilePicture}) center/cover no-repeat`, // Set the background image
        width: imageSize + 'px',
        height: imageSize + 'px',
        borderRadius: '50%', // To create a circular shape
      };
    return (
        <>
            <div className="profile-picture">
                <div className="rounded-circle" style={imageStyle}></div>
            </div>
        </>
    );
}
export default ProfilePicture;