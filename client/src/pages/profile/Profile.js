import { Avatar } from '@mui/material';
import React from 'react'
import './profile.css'

const Profile = () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    return (
        <div>
            <div className='profile_card'>
                <center>
                    <Avatar src='https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0'
                        alt='profile' sx={{ width: '8rem', height: '8rem', marginBottom: '3rem' }} />
                </center>
                <div>
                    <h4>Name</h4>
                    <p>{loggedUser.fullname}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{loggedUser.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile