const AddPost = () => {
    interface Posts{
        id: string;
        caption: string;
        photos: string[];
    }
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
                        <input type="text" className="form-control" id="captionInput" placeholder="Enter caption"></input>
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