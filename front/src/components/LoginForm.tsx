import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const apiUserUrl = import.meta.env.VITE_USER_API_URL

  const navigateToSignup = () => {
    navigate('/signup')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userData = {
      user: {
        email,
        password: hashedPassword
      }
    };

    try {
      const response = await fetch(`${apiUserUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      console.log(response.body)

      if (response.ok) {
        console.log('Connexion réussie !');
        setEmail('');
        setPassword('');
      } else {
        console.error('Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg space-y-4 flex flex-col w-[600px]">
      <h2 className="text-center font-bold text-lg">Connexion</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email-signin"
            placeholder='exemple@gmail.com'
            value={email}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe:</label>
          <input
            type="password"
            id="password-signin"
            placeholder='***********'
            value={password}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className='text-sm'>Pas de compte ? <span className='text-sky-700 underline cursor-pointer' onClick={navigateToSignup}>S'inscire</span></p>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
