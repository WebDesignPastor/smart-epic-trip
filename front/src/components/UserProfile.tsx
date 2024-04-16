import { useState } from "react"
import bcrypt from 'bcryptjs';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { useDispatch } from "react-redux";
import { logout } from "../slices/store";

const UserProfile = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const apiUserUrl = import.meta.env.VITE_USER_API_URL
    const token = useSelector((state: RootState) => state.app.user.token)
    const dispatch = useDispatch()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const hashedPassword = bcrypt.hashSync(password, 10)

        const userData = {
            user: {
              email,
              username,
              password: hashedPassword
            }
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        await axios.put(`${apiUserUrl}/users/1`, userData, config)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => console.log(error))
    }

    const handleLogout = async (e: any) => {
        e.preventDefault()

        dispatch(logout())
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="h-4/5 bg-white shadow-xl rounded-lg w-5/6 flex flex-col items-center px-8">
                <h2 className="my-4 text-xl">Mon profile :</h2>
                <div className="w-full flex justify-between items-center flex-col h-full">
                    <form className='space-y-4 w-full mt-4'>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email-signup"
                                placeholder='exemple@gmail.com'
                                value={email}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                            <input
                                type="username"
                                id="username"
                                placeholder='Toto35'
                                value={username}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe:</label>
                            <input
                                type="password"
                                id="password-signup"
                                placeholder='***********'
                                value={password}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                    <div>
                        <button type="submit" onClick={handleSubmit} className="w-full mb-2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Modifier</button>
                        <button type="submit" onClick={handleLogout} className="w-full mb-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Se déconnecter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile