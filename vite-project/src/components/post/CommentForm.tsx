const CommentForm = () => {
    return (
        <>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Enter comment"></input>
                <label htmlFor="floatingInput">Comment</label>
            </div>
            <div className="form-floating">
                <button type="submit" className="btn btn-primary">Comment</button>
            </div>
        </>
    );
}

export default CommentForm;