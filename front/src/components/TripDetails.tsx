import { useSelector } from "react-redux"
import TripCard from "./TripCard"
import { RootState } from "../redux"
import React, { useEffect, useState } from "react"

interface Props {
    waypointsDetails: WaypointsDetails[]
    setWaypointsDetails: Function
}

const TripDetails: React.FC<Props> = ({waypointsDetails, setWaypointsDetails}) => {
    
    const baseTrip = useSelector((state: RootState) => state.app.tripDetails)
    const [tripDetails, setTripDetails] = useState<any[]>()

    useEffect(() => {
        if(baseTrip[0]) {
            let origin = baseTrip[0].origin
            let destination = baseTrip[0].destination
            let card = [{content: {name: origin}}, {content: {name: destination}}]
            if(waypointsDetails.length > 0) {
                let newArray: TripDetailsElement[] = []
                waypointsDetails.map((wp: WaypointsDetails) => {
                    if(wp.type === 'google') {
                        newArray.push({content: 
                            {
                                name: wp.name, 
                                address_components: wp.address_components,
                                photos: wp?.photos,
                                international_phone_number: wp?.international_phone_number,
                                rating: wp?.rating,
                                place_id: wp?.place_id,
                                type: wp.type
                            }}
                        )
                    } else if(wp.type === 'ticketmaster') {
                        newArray.push({content: 
                            {
                                name: wp.name, 
                                images: wp.images,
                                event_id: wp.event_id,
                                address: wp.address,
                                date: wp.date,
                                type: wp.type
                            }}
                        )
                    }
                })
                let fullArray = [
                    ...card.slice(0, 1),
                    ...newArray,
                    ...card.slice(1)
                ]
                setTripDetails(fullArray)
            } else {
                setTripDetails(card)
            }
        }
    }, [baseTrip, waypointsDetails])

    return (
        <div className="h-full w-full bg-neutral-700 flex flex-col items-center justify-start">
            <h2 className="text-white font-bold text-lg">Epic road trip</h2>
            <div className="w-full px-3 h-[90%] overflow-y-scroll no-scrollbar">
                {tripDetails && tripDetails.map((e, index: number) => {
                    return (
                        <TripCard content={e.content} key={e.place_id ? e.place_id : (e.event_id ? e.event_id : index)} tripDetails={tripDetails} setTripDetails={setTripDetails} waypointsDetails={waypointsDetails} setWaipointsDetails={setWaypointsDetails} />
                    )
                })}
            </div>
        </div>  
    )
}

export default TripDetails