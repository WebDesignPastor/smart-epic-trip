import React from "react"

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
        <nav className="relative flex w-full flex-col sm:flex-row sm:flex-nowrap items-center justify-center bg-neutral-700 py-2 shadow-dark-mild">
            <div className="inline-flex rounded-md shadow-sm sm:w-auto w-full" role="group">
                <button 
                    type="button" 
                    className={isBarsSearching 
                        ? 
                            "px-4 py-2 text-xs sm:text-sm w-1/4 sm:w-auto font-medium text-white bg-blue-400 border border-gray-200 rounded-s-lg"
                        :
                            "px-4 py-2 text-xs sm:text-sm w-1/4 sm:w-auto font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg"
                    }
                    onClick={handleSearchBars}>
                    Bars
                </button>
                <button 
                    type="button" 
                    className={isRestaurantsSearching
                    ?
                        "px-4 py-2 text-xs sm:text-sm w-1/4 sm:w-auto font-medium text-white bg-lime-400 border border-gray-200"
                    :
                        "px-4 py-2 text-xs sm:text-sm w-1/4 sm:w-auto font-medium text-gray-900 bg-white border border-gray-200"
                    }
                    onClick={handleSearchRestaurants}>
                    Restaurants
                </button>
                <button 
                    type="button" 
                    className={isHotelsSearching
                    ?
                        "px-4 py-2 text-xs sm:text-sm w-1/4 sm:w-auto font-medium text-white bg-red-400 border border-gray-200"
                    :
                        "px-4 py-2 text-xs sm:text-sm w-1/4 sm:w-auto font-medium text-gray-900 bg-white border border-gray-200"
                    }
                    onClick={handleSearchHotels}>
                    Hotels
                </button>
                <button type="button" className={isEventsSearching 
                    ?
                        "px-4 py-2 text-xs sm:text-sm w-1/4 sm:w-auto font-medium text-white bg-teal-400 border border-gray-200 rounded-e-lg"
                    :
                        "px-4 py-2 text-xs sm:text-sm w-1/4 sm:w-auto font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg"
                    }
                    onClick={handleSearchEvents}>
                    Evenements
                </button>
            </div>
            <button onClick={handleSearchPoi} type="button" className="mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                    Rechercher
            </button>
        </nav>
    )
}

export default MapOptions