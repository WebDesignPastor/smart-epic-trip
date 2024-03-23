import React, { useState } from "react"
import { Markers } from "./MapView"
import { checkIfArrayHasValue, sortArrayByPropertyType } from "../utils/array"

interface Props {
    searchHotel: () => void,
    searhBars: () => void,
    searhRestaurants: () => void,
    isLoading: boolean,
    setIsLoading: Function
    isBarsSearching: boolean
    setBarsSearching: Function
    isHotelsSearching: boolean
    setHotelsSearching: Function
    isRestaurantsSearching: boolean
    setRestaurantsSearching: Function
    setMarkers: Function
    markers: Markers[]
}

const MapOptions: React.FC<Props> = ({ 
    searchHotel, 
    searhBars, 
    searhRestaurants, 
    isLoading, 
    setIsLoading, 
    isBarsSearching, 
    setBarsSearching, 
    isHotelsSearching,
    setHotelsSearching,
    isRestaurantsSearching,
    setRestaurantsSearching,
    setMarkers,
    markers
}) => {

    const handleSearchBars = () => {
        if(!checkIfArrayHasValue(markers, 'bars')) {
            setIsLoading(!isLoading)
            searhBars()
            setIsLoading(!isLoading)
        } else {
            let newMarkersCollection = markers
            let newArr = sortArrayByPropertyType(newMarkersCollection, 'bars')
            setMarkers(newArr)
        }
        setBarsSearching(!isBarsSearching)
    }

    const handleSearchHotels = () => {
        if(!checkIfArrayHasValue(markers, 'hotel')) {
            setIsLoading(!isLoading)
            searchHotel()
            setIsLoading(!isLoading)
        } else {
            let newMarkersCollection = markers
            let newArr = sortArrayByPropertyType(newMarkersCollection, 'hotel')
            setMarkers(newArr)
        }
        setHotelsSearching(!isHotelsSearching)
    }

    const handleSearchRestaurants = () => {
        if(!checkIfArrayHasValue(markers, 'restaurant')) {
            setIsLoading(!isLoading)
            searhRestaurants()
            setIsLoading(!isLoading)
        } else {
            let newMarkersCollection = markers
            let newArr = sortArrayByPropertyType(newMarkersCollection, 'restaurant')
            setMarkers(newArr)
        }
        setRestaurantsSearching(!isRestaurantsSearching)
    }

    return (
        <nav className="relative flex w-full h-20 flex-nowrap items-center justify-center bg-neutral-700 py-2 shadow-dark-mild">
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
        </nav>
    )
}

export default MapOptions