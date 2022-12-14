import React from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Panel from "./Panel"

const Login = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    let id = 0

    const login = () => {
        
        axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
           resp.data.some(
            e => {
                props.setId(e.id)
                id = e.id
                return (
                e.email === email && 
                e.password === password && 
                e.blocked !== '1' )
            }) 
           ? getDateTime()
           : showAlert("login")
        }).catch(e => {
            console.log(e);
        })
    }

    const getDateTime = () => {
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        const time = `${current.getHours()}:${current.getMinutes()}`
        logingIn(date, time)
    }

    const logingIn = (date, time) => {
        
        const col = 'loginDate'
        const val = date
        const col2 = 'loginTime'
        const val2 = time
        axios.post('https://server-production-8787.up.railway.app/api/update', {col, val, col2, val2, id})
        props.setPanel(true)

    }

    const showAlert = (error) => {
        const alert = document.getElementById("alert")
        alert.style.display = "block"
        if (error === "login") {
            alert.innerText = "Incorrect email or password! Or your account is blocked :("
        }
    }

    return (
        <div>
                <div className="login-box">
                    <h1>Log In</h1>
                    <div style={{display:'none'}} id="alert" className="alert alert-danger" role="alert">
                        ...
                    </div>
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
        </div>
    )
}

export default Login