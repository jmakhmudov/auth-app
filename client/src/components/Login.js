import React from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const login = () => {
        axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
           resp.data.some(
            e => e.email === email && 
            e.password === password) 
           ? console.log("login")
           : console.log("error")
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div className="login-box">
            <h1>Log In</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={login}>Log In</button>
                <small id="emailHelp" className="form-text text-muted">Don't have an account? <span onClick={()=>{navigate("/signup")}}>Register</span></small>
            </form>
        </div>
    )
}

export default Login