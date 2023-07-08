interface Props{
    onCancel: () => void;
}

const EditProfile = ({onCancel}: Props) => {
    return (
        <div className="container-fluid">
            <h1>Edit Profile</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="fileInput">Change Profile Picture: </label>
                    <input type="file" id="fileInput" accept=".jpg,.png,.pdf"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" id="username"></input>
                </div>  
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description"></input>
                </div> 
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"></input>
                </div>   
                <button type="submit" className="btn btn-primary">Save</button>   
                <a onClick={onCancel} className="btn btn-light">Cancel</a>          
            </form>

        </div>
    )
}
export default EditProfile;