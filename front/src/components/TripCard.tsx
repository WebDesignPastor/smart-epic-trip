import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addWaypoint, removeWaypoint } from "../slices/store"
import GoogleTripCard from "./GoogleTripCard"
import TicketMasterTripCard from "./TicketMasterTripCard"

interface Props {
    tripDetails?: any[]
    setTripDetails: Function
    content: WaypointsDetails
    waypointsDetails: any[]
    setWaipointsDetails: Function
}

const TripCard: React.FC<Props> = ({content, tripDetails, setTripDetails, waypointsDetails, setWaipointsDetails}) => {

    const [fullAddress, setFullAddress] = useState('')
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const [photo, setPhoto] = useState('')
    const [classList, setClassList] = useState('max-w-sm rounded overflow-hidden shadow-lg flex bg-gray-100 mt-4 relative')
    const [onlyText, setOnlyText] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if(content && content.type === 'google') {
            if(content.place_id) {
                let newClassList = classList + " min-h-24"
                setClassList(newClassList)
            } else {
                setOnlyText(true)
            }
            if(content.address_components) {
                let newFullAddress = ''
                content.address_components.map((e) => {
                    if(newFullAddress.length == 0) {
                        newFullAddress += e.short_name
                    } else {
                        newFullAddress += ` ${e.short_name}`
                    }
                })
                setFullAddress(newFullAddress)
            }
            if(content.photos && content.photos[0].photo_reference) {
                setPhoto(`https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photo_reference=${content.photos[0].photo_reference}&maxwidth=1600`)
            }
        } else if (content && content.type === 'ticketmaster') {
            if(content.images) {
                setPhoto(content.images)
            }
            if(content.address) {
                let newFullAddress = `${content.address[0].address.line1} ${content.address[0].city.name} ${content.address[0].postalCode} ${content.address[0].country.name}`
                setFullAddress(newFullAddress)
            }
        }
    }, [content])

    const handleClose = (place_id: string | null | undefined, event_id: string | null | undefined) => {
        if(tripDetails !== undefined) {
            if(place_id) {
                let removeTripIndex = tripDetails.findIndex(wp => wp.content.place_id === place_id)
                tripDetails.splice(removeTripIndex, 1)
                setTripDetails(tripDetails)
            }

            if(event_id) {
                let removeTripIndex = tripDetails.findIndex(wp => wp.content.event_id === event_id)
                tripDetails.splice(removeTripIndex, 1)
                setTripDetails(tripDetails)
            }
        }
        if(waypointsDetails !== undefined) {
            if(place_id) {
                let removeWaypointsIndex = waypointsDetails.findIndex(wp => wp.place_id === place_id)
                waypointsDetails.splice(removeWaypointsIndex, 1)
                setWaipointsDetails(waypointsDetails)
            }

            if(event_id) {
                let removeWaypointsIndex = waypointsDetails.findIndex(wp => wp.event_id === event_id)
                waypointsDetails.splice(removeWaypointsIndex, 1)
                setWaipointsDetails(waypointsDetails)
            }
        }
        let id = ''
        if(place_id) {
            id = place_id
        }
        if(event_id) {
            id = event_id
        }
        dispatch(removeWaypoint(id))
    }

    return (
        <div className="max-w-[500px] max-h-36 rounded overflow-hidden shadow-lg flex bg-gray-200 mt-4 relative">
            {(content.place_id || content.event_id) &&
                <div className="absolute top-0 right-0 mt-1 mr-1">
                    <button onClick={() => handleClose(content.place_id, content.event_id)} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-3 w-3 flex flex-row" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            }
            {content.type === 'google' && <GoogleTripCard content={content} photo={photo} fullAddress={fullAddress} onlyText={onlyText} />}
            {content.type === 'ticketmaster' && <TicketMasterTripCard content={content} photo={photo} fullAddress={fullAddress} />}
            {!content.type && 
                <div className="flex flex-col w-full p-2">
                    <h3 className="m-2 text-lg flex justify-center">{content.name}<strong></strong></h3>
                </div>
            }
        </div>
    )
}

export default TripCard