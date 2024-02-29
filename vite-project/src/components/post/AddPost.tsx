import { useState, useEffect } from "react";

interface Post{
    id: string;
    caption: string;
    photos: string[];
}

const AddPost = () => {
    const [formData, setFormData] = useState<Post>({
        id: "",
        caption: "",
        photos: [""]
    });

    const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files?.[0]; // Get the selected file from the input
        if (files) {
            // Store the selected file in the state
            console.log("Setting profile url");
            setFormData((prevData) => ({ ...prevData, profileFile: files }));
        }
    };
    return (
        <>
            <div className="container-fluid">
                <h1>Add Post</h1>
                <form>
                    <div className="form-floating mb-3">
                        <input type="file" className="form-control" id="photoUpload" accept="image/*" multiple></input>
                        <label htmlFor="photoUpload">Upload Photos:</label>
                    </div>         
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="caption" placeholder="Enter caption" onChange={handleCaptionChange}></input>
                        <label htmlFor="captionInput">Caption:</label>
                    </div>
                    <div className="form-floating">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );

};

export default AddPost;