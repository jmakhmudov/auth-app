import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"  

const SignUp = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const showAlert = (error) => {
        const alert = document.getElementById("alert")
        alert.style.display = "block"
        if (error === "email") {
            alert.innerText = "This email is already in use!"
        } else if (error === "blank") {
            alert.innerText = "Fill blank fields!"
        }
    }

    const sendData = () => {
        navigate("/")
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        const time = `${current.getHours()}:${current.getMinutes()}`
        console.log(time)
        axios.post('https://server-production-8787.up.railway.app/api/insert', 
        {userData, date, time}).then(() => {
            window.alert("Succesfully signed up!")
        })
    }

    const checkEmail =() => {
        axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
            if (resp.data.some(el => el.email === userData.email)) {
                showAlert("email")
            } else {
                sendData()
            }
        })
    }

    const signin = () => {
        if (userData.name === '' ||
            userData.email === '' ||
            userData.password === '') {
            showAlert("blank")
        }
        else {
            checkEmail()
        }        
    }

    const onChange = (element, value) => {
        setUserData((prevData) => {
            return {
                ...prevData,
                [element]: value
            }
        })
    }

    return (
        <div className="signup-box">
            <h1>Sign Up</h1>
            <div style={{display:'none'}} id="alert" className="alert alert-danger" role="alert">
                ...
            </div>
            <form>
                <div className="form-group row">
                    <div className="col">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Name" 
                            onChange={(e) => onChange("name", e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Email" 
                            onChange={(e) => onChange("email", e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                        <div className="col">
                            <input 
                                type="password" 
                                className="form-control"
                                id="exampleInputPassword1" 
                                placeholder="Password" 
                                onChange={(e) => onChange("password", e.target.value)}
                            />
                        </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={signin}>Sign Up</button>
                <small id="emailHelp" className="form-text text-muted">Have account? <span onClick={()=>{navigate("/")}}>Log In</span></small>
            </form>
        </div>
    )
}

export default SignUp;