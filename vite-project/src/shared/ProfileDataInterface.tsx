interface ProfileInterface { //accountsList, SearchResults, ViewFollowers, ViewFollowing, Profile
    id: string;
    username: string;
    description: string;
    followers: string[];
    following: string[];
    //posts: string[];
    profilePhotoUrl: string;
}
export default ProfileInterface;