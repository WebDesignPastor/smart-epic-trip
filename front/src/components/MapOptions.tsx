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
}

const MapOptions: React.FC<Props> = ({ 
    handlePoi,
    isBarsSearching, 
    setBarsSearching, 
    isHotelsSearching,
    setHotelsSearching,
    isRestaurantsSearching,
    setRestaurantsSearching,
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

    const handleSearchPoi = () => {
        handlePoi()
    }

    return (
        <nav className="relative flex w-full flex-nowrap items-center justify-center bg-neutral-700 py-2 shadow-dark-mild">
            <div>
                {/* logo */}
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
                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg">
                    Evenements
                </button>
            </div>
            <button onClick={handleSearchPoi} type="button" className="ml-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                    Rechercher
            </button>
        </nav>
    )
}

export default MapOptions