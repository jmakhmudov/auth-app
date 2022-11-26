import React from "react"
import axios from "axios"
import '../styles/App.css'

const Panel = (props) => {
    const [elements, setElements] = React.useState([])
    const [selected, setSelected] = React.useState([])
    const [logout, setLogout] = React.useState(false)
    const ids = []

    const getUsers = () => {
        axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
            setElements(resp.data)
        })
        checkUser()
    }

    const checkUser = () => {
        const id = props.id
        axios.get('https://server-production-8787.up.railway.app/api/user', id).then(resp => {
            resp.data.blocked == 0 || resp.data ? setLogout(false) : setLogout(true)
        })
    }
    
    const deleteUser = () => {
        axios.post('https://server-production-8787.up.railway.app/api/delete', {selected})
        setElements(prev=>prev)
    }

    const blockUser = (val) => {
        axios.post('https://server-production-8787.up.railway.app/api/block', {val,selected})
        setElements(prev=>prev)
    }

    const selectCheckbox = (e) => {
        if (e.target.checked) {
            setSelected(prev => ([...prev, e.target.id]))
        } else {
            document.getElementById("all").checked = false
            setSelected(prev => {
                return prev.filter((id) => {
                    return id !== e.target.id
                })
            })
        }
    }

    const selectAll = (e) => {
        e.target.checked ? setSelected(ids) : setSelected([])
        ids.map(id => {
            if (e.target.checked) {
                document.getElementById(id).checked = true
            }
            else {
                document.getElementById(id).checked = false
            }
        })
    }
    
    React.useEffect(() => {
        getUsers()
    },[elements])

    return (
        <div>

            {logout ? window.location.reload() :
                <div className="panel">
                <div className="toolbar">
                    <div className="block">
                        <img src="./block.png" onClick={() => {blockUser(1)}} />
                    </div>
                    <div className="unblock">
                        <img src="./unblock.png" onClick={() => {blockUser(0)}} />
                    </div>
                    <div className="delete">
                        <img src="./remove.png" onClick={deleteUser} />
                    </div>
                </div>

                <table className="table table-striped">
                    <thead className="thead">
                        <tr>
                            <th>
                                <input onChange={selectAll} id="all" className="checkbox" type="checkbox" />
                            </th>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Registration</th>
                            <th scope="col">Login</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements.map(user => {
                            ids.push(JSON.stringify(user.id))
                            return (
                                <tr>
                                    <th>
                                        <input onChange={selectCheckbox} id={user.id} className="checkbox" type="checkbox" />
                                    </th>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.regDate}, {user.regTime}</td>
                                    <td>{user.loginDate}, {user.loginTime}</td>
                                    <td>{user.blocked==='1' ? "Blocked" : "Active"}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default Panel