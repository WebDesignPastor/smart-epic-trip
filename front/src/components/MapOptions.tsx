import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../redux"

interface Props {
    isLoading: boolean,
    setIsLoading: Function
    isBarsSearching: boolean
    setBarsSearching: Function
    isHotelsSearching: boolean
    setHotelsSearching: Function
    isRestaurantsSearching: boolean
    setRestaurantsSearching: Function
    handlePoi: Function
    setEventsSearching: Function
    isEventsSearching: boolean
}

const MapOptions: React.FC<Props> = ({ 
    handlePoi,
    isBarsSearching, 
    setBarsSearching, 
    isHotelsSearching,
    setHotelsSearching,
    isRestaurantsSearching,
    setRestaurantsSearching,
    setEventsSearching,
    isEventsSearching
}) => {

    const isUserAuth = useSelector((state: RootState) => state.app.user.isAuth)
    const navigate = useNavigate()
    const navigateToHome = () => {
        navigate('/')
    }
    const navigateToLogin = () => {
        navigate('/login')
    }

    const handleSearchBars = () => {
        setBarsSearching(!isBarsSearching)
    }

    const handleSearchHotels = () => {
        setHotelsSearching(!isHotelsSearching)
    }

    const handleSearchRestaurants = () => {
        setRestaurantsSearching(!isRestaurantsSearching)
    }

    const handleSearchEvents = () => {
        setEventsSearching(!isEventsSearching)
    }

    const handleSearchPoi = () => {
        handlePoi()
    }

    return (
        <nav className="relative flex w-full flex-nowrap items-center justify-between bg-neutral-700 py-2 shadow-dark-mild max-h-14">
            <div>
                <h2 className="text-white ml-6 cursor-pointer" onClick={navigateToHome}>Epic Road Trip</h2>
            </div>
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button 
                    type="button" 
                    className={isBarsSearching 
                        ? 
                            "px-4 py-2 text-sm font-medium text-white bg-blue-400 border border-gray-200 rounded-s-lg"
                        :
                            "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg"
                    }
                    onClick={handleSearchBars}>
                    Bars
                </button>
                <button 
                    type="button" 
                    className={isRestaurantsSearching
                    ?
                        "px-4 py-2 text-sm font-medium text-white bg-lime-400 border border-gray-200"
                    :
                        "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200"
                    }
                    onClick={handleSearchRestaurants}>
                    Restaurants
                </button>
                <button 
                    type="button" 
                    className={isHotelsSearching
                    ?
                        "px-4 py-2 text-sm font-medium text-white bg-red-400 border border-gray-200"
                    :
                        "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200"
                    }
                    onClick={handleSearchHotels}>
                    Hotels
                </button>
                <button type="button" className={isEventsSearching 
                    ?
                        "px-4 py-2 text-sm font-medium text-white bg-teal-400 border border-gray-200 rounded-e-lg"
                    :
                        "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg"
                    }
                    onClick={handleSearchEvents}>
                    Evenements
                </button>
                <button onClick={handleSearchPoi} type="button" className="ml-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                        Rechercher
                </button>
            </div>
            <div>
                {isUserAuth ?
                    <h2 className="text-white mr-6 cursor-pointer" onClick={navigateToLogin}>Profile</h2>
                :
                    <h2 className="text-white mr-6 cursor-pointer" onClick={navigateToLogin}>Se connecter</h2>
                }
            </div>
        </nav>
    )
}

export default MapOptions