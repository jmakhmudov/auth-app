import React from "react"
import axios from "axios"
import '../styles/App.css'

const Panel = () => {
    const [elements, setElements] = React.useState([])
    const [selected, setSelected] = React.useState([])
    const ids = []

    const getUsers = () => {
        axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
            setElements(resp.data)
        })
    }
    
    const deleteUser = () => {
        axios.post('https://server-production-8787.up.railway.app/api/delete', {selected})
        setElements(prev=>prev)
    }

    const blockUser = () => {
        const val = 1
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
        <div className="panel">
            <nav className="navbar">
                <button className="btn btn-primary" type="button">Search</button>
                <button onClick={deleteUser}>Delete</button>
                <button onClick={blockUser}>Block</button>
            </nav>

            <table className="table">
                <thead className="thead-dark">
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
                                <td>{user.blocked==='1' ? "Blocked" : "Unblocked"}</td>
                            </tr>
                        )
                    })}
                </tbody>
</table>
        </div>
    )
}

export default Panel