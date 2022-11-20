import React from "react"

const Login = () => {

    return (
        <div className="login-box">
            <h1>Log In</h1>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                    />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        class="form-control"
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                    />
                </div>
                <button type="submit" class="btn btn-primary">Log In</button>
                <small id="emailHelp" class="form-text text-muted">Don't have an account? <span>Register</span></small>
            </form>
        </div>
    )
}

export default Login