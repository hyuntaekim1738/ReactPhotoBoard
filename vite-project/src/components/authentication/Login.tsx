const Login = () => {
    return (
        <div className="container-fluid">
            <h1>Login</h1>
            <form>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="Enter email"></input>
                    <label htmlFor="email" className="form-label">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="username" className="form-control" id="username" placeholder="Enter username"></input>
                    <label htmlFor="username" className="form-label">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Enter password"></input>
                    <label htmlFor="password" className="form-label">Password</label>
                </div>
                <div className="form-floating">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

        </div>
    );
}
export default Login;