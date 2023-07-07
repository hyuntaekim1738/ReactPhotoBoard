const ProfilePicture = () => {
    const styles = {
        height: '150px',
        width: '150px',
    };

    return (
        <>
        <span className="border border-light rounded-circle" style={styles}>
            <span className="visually-hidden">Profile Picture</span>
        </span>
        </>
    );
}
export default ProfilePicture;