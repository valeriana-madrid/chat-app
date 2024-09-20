import { Box } from '@mui/material'
import { pink } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import ChatArea from '../components/chat/ChatArea'
import ListOfUsers from '../components/chat/ListOfUsers'
import Welcome from '../components/chat/Welcome'
import { useUser } from '../contexts/UserContext'
import api from '../configs/api'

const Chats = () => {

    const { user } = useUser()
    const [selectedUser, setSelectedUser] = useState(null)

    const [users, setUsers] = useState([])

    useEffect(() => {
        api.get('/getAllUsers')
            .then(res => setUsers(res.data.users))
    }, [])

    return (
        <Box sx={{ background: pink[100], height: '80vh', mt: 5, width: '80%', mx: 'auto', display: 'flex' }}>
            {/* list of users */}
            <ListOfUsers users={users} setSelectedUser={setSelectedUser} />

            {
                selectedUser ?
                    <ChatArea selectedUser={selectedUser} /> :
                    <Welcome user={user} />
            }

        </Box>
    )
}

export default Chats