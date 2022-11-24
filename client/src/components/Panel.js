import React from "react"
import axios from "axios"

const Panel = () => {
    const [elements, setElements] = React.useState([])
    const [refresh, setRefresh] = React.useState(false)

    const getUsers = () => {
        axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
            setElements(resp.data)
        })
    }

    React.useEffect(() => {
        getUsers()
    },[refresh])

    return (
        <div>
            <button onClick={() => {setRefresh(prev=> !prev)}}>Refresh</button>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Registration</th>
                    <th scope="col">Login</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {elements.map(user => {
                        return (
                            <tr>
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