import React from 'react';
import LoginForm from '../components/LoginForm';
import Nav from '../components/Nav';

const Login: React.FC = () => {

    return (
        <div className='flex flex-col items-center h-screen'>
            <Nav />
            <LoginForm />
        </div>
    );

}

export default Login
