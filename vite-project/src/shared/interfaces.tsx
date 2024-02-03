interface Post{ //addPost
    id: string;
    caption: string;
    photos: string[];
}

interface Profile { //accountsList, SearchResults, ViewFollowers, ViewFollowing, Profile
    id: string;
    username: string;
    description: string;
    followers: string[];
    following: string[];
    posts: string[];
    profilePhotoUrl: string;
}

interface ProfileData { //EditProfile
    username: string;
    email: string;
    password: string;
    description: string;
    profilePhotoUrl: string;
    profileFile: File | null;
}

export interface Bundle {
    profile: Profile;
}