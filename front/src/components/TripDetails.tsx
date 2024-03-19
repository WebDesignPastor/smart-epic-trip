import { useSelector } from "react-redux"
import TripCard from "./TripCard"
import { RootState } from "../redux"
import { useEffect, useState } from "react"

const TripDetails = () => {
    
    const baseTrip = useSelector((state: RootState) => state.app.tripDetails)
    const [tripDetails, setTripDetails] = useState<TripDetailsElement[]>()

    useEffect(() => {
        if(baseTrip[0]) {
            let origin = baseTrip[0].origin
            let destination = baseTrip[0].destination
            let card = [{content: origin}, {content: destination}]
            setTripDetails(card)
        }
    }, [baseTrip])

    // tous les waypoints selectionnés
    // sous forme titre si résumé afficher description sous la forme de card
    return (
        <div className="h-full w-full bg-neutral-700 flex flex-col items-center">
            <h2 className="text-white pt-4 font-bold text-lg">Epic road trip</h2>
            <div className="w-full px-8 pt-8">
                {tripDetails && tripDetails.map((e, index) => {
                    return (
                        <TripCard content={e.content} desc={e.desc} key={index} />
                    )
                })}
            </div>
        </div>  
    )
}

export default TripDetails