interface Props{
    onCancel: () => void;
}

const EditProfile = ({onCancel}: Props) => {
    return (
        <div className="container-fluid">
            <h1>Edit Profile</h1>
            <form>
                <div className="form-floating mb-3">
                    <input type="file" className="form-control" id="fileInput" accept=".jpg,.png,.pdf"></input>
                    <label htmlFor="fileInput">Change Profile Picture: </label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email"></input>
                    <label htmlFor="email" className="form-label">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="username" className="form-control" id="username"></input>
                    <label htmlFor="username" className="form-label">Username</label>
                </div>  
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="description"></input>
                    <label htmlFor="description" className="form-label">Description</label>
                </div> 
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password"></input>
                    <label htmlFor="password" className="form-label">Password</label>
                </div>   
                <div className="form-floating">
                    <button type="submit" className="btn btn-primary">Save</button>   
                    <a onClick={onCancel} className="btn btn-light">Cancel</a>   
                </div>       
            </form>

        </div>
    )
}
export default EditProfile;