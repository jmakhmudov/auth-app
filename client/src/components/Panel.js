import React from "react"
import axios from "axios"

const Panel = () => {
    const [elements, setElements] = React.useState([])

    const getUsers = () => {
        const i=[]
        axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
            setElements(resp.data)
        })
    }

    React.useEffect(() => {
        getUsers()
    },[1])

    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Registration date</th>
                    <th scope="col">Last login</th>
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
                                <td>{user.regDate}</td>
                                <td>{user.lastDate}</td>
                                <td>{user.status ? "blocked" : "not blocked"}</td>
                            </tr>
                        )
                    })}
                </tbody>
</table>
        </div>
    )
}

export default Panel