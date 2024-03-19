interface PostInterface{ //addPost
    userId: string;
    postId: string;
    caption: string;
    date: Date;
    photos: FileList | null;
    likes: string[];
    photoNames: string[];
    photoUrls: string[];
    comments: string[];
    //comments must be a string and a date, maybe automatically append the date to the string?
}
export default PostInterface;