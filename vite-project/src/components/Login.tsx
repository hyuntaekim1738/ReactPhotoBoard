const Login = () => {
    return (
        <div className="container-fluid">
            <h1>Login</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" id="username"></input>
                </div>  
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"></input>
                </div>   
                <button type="submit" className="btn bn-primary">Submit</button>             
            </form>

        </div>
    );
}
export default Login;