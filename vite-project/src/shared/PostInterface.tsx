interface PostInterface{ //addPost
    userId: string;
    postId: string;
    caption: string;
    date: Date;
    photos: FileList | null;
    photoNames: string[];
    photoUrls: string[];
    //add a list of strings for who liked it
}
export default PostInterface;