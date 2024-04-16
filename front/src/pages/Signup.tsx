import React from 'react';
import SignUpForm from '../components/SignUpForm';
import Nav from '../components/Nav';

const Signup: React.FC = () => {

    return (
        <div className='flex flex-col items-center h-screen'>
            <Nav />
            <SignUpForm />
        </div>
    );

}

export default Signup
