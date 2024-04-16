import { useNavigate } from "react-router-dom"

const Nav = () => {

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToLogin = () => {
        navigate('/login')
    }

    return (
        <nav className="relative flex w-full flex-nowrap items-center justify-between bg-neutral-700 py-2 shadow-dark-mild h-14">
            <div>
                <h2 className="text-white ml-6 cursor-pointer" onClick={navigateToHome}>Epic Road Trip</h2>
            </div>
            <div>
                <h2 className="text-white mr-6 cursor-pointer" onClick={navigateToLogin}>Se connecter</h2>
            </div>
        </nav>
    )
}

export default Nav