import React from "react"
import axios from "axios"
import '../styles/App.css'

const Panel = () => {
    const [elements, setElements] = React.useState([])
    const [selected, setSelected] = React.useState([])
    const [refresh, setRefresh] = React.useState(false)
    const ids = []

    const getUsers = () => {
        axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
            setElements(resp.data)
        })
    }
    
    const deleteUser = () => {
        axios.post('https://server-production-8787.up.railway.app/api/delete', {selected})
    }

    const blockUser = () => {
        const val = 0
        axios.post('https://server-production-8787.up.railway.app/api/delete', {val,selected})
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
    console.log(selected)
    React.useEffect(() => {
        getUsers()
    },[1])

    return (
        <div className="panel">
            <nav className="navbar">
                <button className="btn btn-primary" type="button">Search</button>
                <p onClick={deleteUser}>Delete</p>
                <p onClick={blockUser}>Block</p>
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