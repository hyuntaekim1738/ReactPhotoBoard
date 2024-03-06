interface ProfileDataInterface { //EditProfile
    username: string;
    email: string;
    password: string;
    description: string;
    profilePhotoUrl: string;
    profileFile: File | null;
}
export default ProfileDataInterface;