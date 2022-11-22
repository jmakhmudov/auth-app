import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"  

const SignUp = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = React.useState({
        name: '',
        email: '',
        password: '',
        regDate: ''
    })

    const sendData = () => {
        navigate("/")
        axios.post('https://server-production-8787.up.railway.app/api/insert', 
        {userData}).then(() => {
            alert("Succesfully signed up!")
        })
    }

    const checkEmail =() => {
        axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
            if (resp.data.some(el => el.email === userData.email)) {
                window.alert("This email is already in use!")
            } else {
                setUserData(prevData => {
                    var current = new Date(),
                    date =  `${current.getDate()}.${current.getMonth()+1}.${current.getFullYear()}`;
                    return {
                        ...prevData,
                        regDate: date
                    }
                })
                console.log(userData.regDate)
                sendData()
            }
        })
    }

    const signin = () => {
        if (userData.name === '' ||
            userData.email === '' ||
            userData.password === '') {
            console.log("error")
        }
        else {
            checkEmail()
        }
        //checkEmail()
        
        
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