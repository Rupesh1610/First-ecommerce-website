import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('/api/allusers', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                setUsers(result)
            }).catch(err => console.log(err))
    }, [])

    const handleClick = (id) => {
        fetch(`/api/deleteuser/${id}`, {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                alert(result)
                window.location.reload()
            }).catch(err => console.log(err))
    }
    return (
        <div style={{ width: '50%', margin: '4rem auto 0' }}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td><a href={`mailto:${user.email}`}><EmailIcon color='primary' sx={{ marginRight: '3rem' }} /></a>
                                    <DeleteIcon color='error' onClick={() => { handleClick(user._id) }} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Users