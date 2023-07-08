import Post from './Post';


const AddPost = () => {
    return (
        <>
            <div className="container-fluid">
                <h1>Add Post</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="photoUpload">Upload Photos:</label>
                        <input type="file" id="photoUpload" accept="image/*" multiple></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="captionInput">Caption:</label>
                        <input type="text" id="captionInput" placeholder="Enter caption"></input>
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </>
    );

};

export default AddPost;