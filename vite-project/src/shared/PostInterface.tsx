interface PostInterface{ //addPost
    userId: string;
    postId: string;
    caption: string;
    date: Date;
    photos: FileList | null;
    photoUrls: string[];
}
export default PostInterface;