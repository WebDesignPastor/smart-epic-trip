import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import TripList from '../components/TripList';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

const Profile: React.FC = () => {

    const isUserAuth = useSelector((state: RootState) => state.app.user.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isUserAuth) {
            navigate('/')
        }
    }, [isUserAuth])

    return (
        <div className='flex flex-col items-center h-screen'>
            <Nav />
            <div className='w-full flex justify-between h-full'>
                <div className='w-1/2'>
                    <UserProfile />
                </div>
                <div className='w-1/2'>
                    <TripList />
                </div>
            </div>
        </div>
    );

}

export default Profile
