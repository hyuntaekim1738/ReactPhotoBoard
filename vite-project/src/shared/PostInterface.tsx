interface PostInterface{ //addPost
    userId: string;
    postId: string;
    caption: string;
    date: Date;
    photos: FileList | null;
    likes: string[];
    photoNames: string[];
    photoUrls: string[];
}
export default PostInterface;