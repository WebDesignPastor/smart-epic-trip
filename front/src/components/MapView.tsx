import { DirectionsRenderer, GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api"
import React, { useRef, useState } from "react"
import axios from "axios"
import MarkerLogo from "./MarkerLogo"
import MapOptions from "./MapOptions"
import { calculateDistance } from "../utils/distance"
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import TripDetails from "./TripDetails"
import PlaceDetails from "./PlaceDetails"
import { useDispatch } from "react-redux"
import { addWaypoint, addWaypointsDetails } from "../slices/store"

export interface Markers {
    id: string
    lat: number
    lng: number
    type: string
}

interface Props {
    width: string
    height: string
    zoomDef: number
    margin: string
}

const MapView: React.FC<Props> = ({width, height, zoomDef, margin}) => {

    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const apiUrl = import.meta.env.VITE_API_URL
    const directionsOptions = useSelector((state: RootState) => state.app.directionsOptions)
    const departureDate = useSelector((state: RootState) => state.app.startDate)
    const arrivalDate = useSelector((state: RootState) => state.app.endDate)
    const dispatch = useDispatch()
    const defaultMapOptions = {
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        styles: [
            {
                elementType: 'all',
                featureType: 'poi',
                stylers: [
                    { "visibility": "off"}
                ]
            },
            {
                elementType: 'all',
                featureType: 'transit',
                stylers: [
                    { "visibility": "off"}
                ]
            },
        ],
    }
    const style = {
        width: width,
        height: height,
        margin: margin
    }

    if(!googleMapsApiKey || !apiUrl) {
        return null
    }

    const [center, setCenter] = useState<{lat: number, lng: number} | null>(null)
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
    const mapRef = useRef<google.maps.Map | null>(null)
    const [markers, setMarkers] = useState<Markers[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [mapRadius, setMapRadius] = useState(50000)
    const [isBarsSearching, setBarsSearching] = useState(false)
    const [isHotelsSearching, setHotelsSearching] = useState(false)
    const [isRestaurantsSearching, setRestaurantsSearching] = useState(false)
    const [isEventsSearching, setEventsSearching] = useState(false)
    const [placeDetails, setPlaceDetails] = useState<PlaceDetail | null>(null)
    const [isShowingDetails, setIsShowingDetails] = useState(false)
    const [waypointsDetails, setWaypointsDetails] = useState<any>([])
    const [isGoogleMapResult, setGoogleMapResult] = useState(false)
    const [eventDetails, setEventDetails] = useState<EventDetail | null>(null)
    
    const { isLoaded } = useJsApiLoader({ googleMapsApiKey })

    if(!isLoaded) {
        return null
    }

    // set the route 
    const directionService = new google.maps.DirectionsService()

    const createCustomMarker = (data: PlaceApiResResult[], type: string) => {
        if(type !== 'events') {
            let newMarkerCollection: Markers[] = []
            data.map((res: PlaceApiResResult) => {
                if(!newMarkerCollection.find((e:Markers) => e.id === res.place_id)) {
                    newMarkerCollection.push({lat: res.geometry.location.lat, lng: res.geometry.location.lng, id: res.place_id, type: type})
                }
            })
            return newMarkerCollection
        } else {
            let newMarkerCollection: Markers[] = []
            data.map((res: any) => {
                if(!newMarkerCollection.find((e:Markers) => e.id === res.place_id)) {
                    newMarkerCollection.push({lat: Number(res._embedded.venues[0].location.latitude), lng: Number(res._embedded.venues[0].location.longitude), id: res.id, type: type})
                }
            })
            return newMarkerCollection
        }
    }

    const onMarkerClick = async (index: string, type: string) => {
        setIsLoading(true)
        if(type !== 'events') {
            const details = await axios.get(`${apiUrl}/details/${index}`)
            let detailsResult = details.data.result 
            setGoogleMapResult(true)
            setEventDetails(null)
            setPlaceDetails(detailsResult)
        } else {
            setGoogleMapResult(false)
            const details = await axios.get(`${apiUrl}/events/${index}`)
            setEventDetails(details.data)
            setPlaceDetails(null)
        }
        setIsShowingDetails(true)
        setIsLoading(false)
    }

    const searchHotel = async () => {
        const centerCoord = mapRef.current?.getCenter()
        const hotel = await axios.get(`${apiUrl}/hotels/all?location=${centerCoord?.lat()},${centerCoord?.lng()}&radius=${mapRadius}`)
        if(hotel.data.results) {
            const results = hotel.data.results
            let toReturn = createCustomMarker(results, 'hotel')
            return toReturn
        }
    }

    const searhBars = async () => {
        const centerCoord = mapRef.current?.getCenter()
        const bars = await axios.get(`${apiUrl}/bars/all?location=${centerCoord?.lat()},${centerCoord?.lng()}&radius=${mapRadius}`)
        if(bars.data.results) {
            const results = bars.data.results
            let toReturn = createCustomMarker(results, 'bars')
            return toReturn
        }
    }

    const searhRestaurants = async () => {
        const centerCoord = mapRef.current?.getCenter()
        const restaurant = await axios.get(`${apiUrl}/restaurants/all?location=${centerCoord?.lat()},${centerCoord?.lng()}&radius=${mapRadius}`)
        if(restaurant.data.results) { 
            const results = restaurant.data.results
            let toReturn = createCustomMarker(results, 'restaurant')
            return toReturn
        }
    }

    const searchEvents= async () => {
        const centerCoord = mapRef.current?.getCenter()
        const latlong = `${centerCoord?.lat()},${centerCoord?.lng()}`
        const fullUrl = `${apiUrl}/events?latlong=${latlong}&radius=${Math.round(mapRadius/1000)}&startDateTime=${departureDate}&endDateTime=${arrivalDate}`
        const events = await axios.get(fullUrl)
        if(events.data.events) {
            const results = events.data.events
            let toReturn = createCustomMarker(results, 'events')
            return toReturn
        }
    }

    const handlePoi = async () => {
        setIsLoading(!isLoading)
        let newMarkers: Markers[] = []
        if(isRestaurantsSearching) {
            let res = await searhRestaurants()
            if(res !== undefined) {
                newMarkers = newMarkers.concat(res)
            }
        }
        if(isHotelsSearching) {
            let res = await searchHotel()
            if(res !== undefined) {
                newMarkers = newMarkers.concat(res)
            }
        }
        if(isBarsSearching) {
            let res = await searhBars()
            if(res !== undefined) {
                newMarkers = newMarkers.concat(res)
            }
        }
        if(isEventsSearching) {
            let res = await searchEvents()
            if(res !== undefined) {
                newMarkers = newMarkers.concat(res)
            }
        }
        setMarkers(newMarkers)
        setIsLoading(!isLoading)
    }

    const renderSwitch = (marker: Markers) => {
        switch (marker.type) {
            case 'restaurant' :
                return <MarkerLogo  color="bg-lime-400" content="R" handler={onMarkerClick} index={marker.id} markerType={marker.type} />
            case 'hotel':
                return <MarkerLogo  color="bg-red-400" content="H" handler={onMarkerClick} index={marker.id} markerType={marker.type}/>
            case 'bars':
                return <MarkerLogo  color="bg-blue-400" content="B" handler={onMarkerClick} index={marker.id} markerType={marker.type}/>
            case 'events':
                return <MarkerLogo  color="bg-teal-400" content="E" handler={onMarkerClick} index={marker.id} markerType={marker.type}/>
        }
    }

    const calculateDirections = (options: any, center: any) => {
        directionService.route(options, (res, status) => {
            if(status === 'OK') {
                setCenter(center)
                setDirections(res)
            } else {
                console.log('Error', status)
            }
        })
    }

    const mapOnLoad = (map: google.maps.Map) => {
        if(map) {
            mapRef.current = map
            const bounds = map.getBounds()
            if(bounds) {
                const ne = bounds.getNorthEast()
                const sw = bounds.getSouthWest()

                const distance = Math.round(window.google.maps.geometry.spherical.computeDistanceBetween(ne,sw) / 2)

                setMapRadius(distance)
            }
            if(directionsOptions) {
                calculateDirections(directionsOptions, directionsOptions.origin)
            }
        }
    }

    const mapOnChange = () => {
        if(mapRef != null) {
            setIsShowingDetails(false)
            let newCenter = {lat: mapRef.current?.getCenter()?.lat()!, lng: mapRef.current?.getCenter()?.lng()! }
            const bounds = mapRef.current?.getBounds()
            if(bounds) {
                const ne = bounds.getNorthEast()
                const sw = bounds.getSouthWest()
                const distance = Math.round(calculateDistance(ne.lat(), ne.lng(), sw.lat(), ne.lng()) / 2)
                
                setMapRadius(distance)
            }
            if(directionsOptions) {
                calculateDirections(directionsOptions, newCenter)
            }
        }
    }

    const onZoom = () => {
        if(mapRef != null) {
            let newCenter = {lat: mapRef.current?.getCenter()?.lat()!, lng: mapRef.current?.getCenter()?.lng()! }
            const bounds = mapRef.current?.getBounds()
            if(bounds) {
                const ne = bounds.getNorthEast()
                const sw = bounds.getSouthWest()
                const distance = Math.round(calculateDistance(ne.lat(), ne.lng(), sw.lat(), ne.lng()) / 2)
                
                setMapRadius(distance)
            }
            if(directionsOptions) {
                calculateDirections(directionsOptions, newCenter)
            }
        }
    }

    const addWaypoints = (item: PlaceDetail | null | undefined, event: EventDetail | null | undefined) => {
        if(directionsOptions) {
            let currentDirectionsOptions = JSON.parse(JSON.stringify(directionsOptions))
            let newWaypointCollection = []
            if(item) {
                let newWaypoint = {
                    place_id: item.place_id,
                    dir: {
                        location: {lat: item.geometry.location.lat, lng: item.geometry.location.lng}, stopover: true
                    }
                }
                let waypointDetails = {
                    name: item.name,
                    address_components: item?.address_components,
                    photos: item?.photos,
                    phone_number: item?.international_phone_number,
                    rating: item?.rating,
                    place_id: item.place_id,
                    type: 'google'
                }
                newWaypointCollection = [...waypointsDetails, waypointDetails]
                currentDirectionsOptions.waypoints!.push(newWaypoint.dir)
                dispatch(addWaypoint(newWaypoint))
                dispatch(addWaypointsDetails(waypointDetails))
                calculateDirections(currentDirectionsOptions, center)
                setIsShowingDetails(false)
                setWaypointsDetails(newWaypointCollection)
            }

            if(event) {
                let newWaypoint = {
                    event_id: event.id,
                    dir: {
                        location: {lat: Number(event._embedded.venues[0].location.latitude), lng: Number(event._embedded.venues[0].location.longitude)}, stopover: true
                    }
                }
                let waypointDetails = {
                    name: event.name,
                    event_id: event.id,
                    images: event.images[0].url,
                    date: event.dates.start.localDate,
                    address: event._embedded.venues,
                    type: 'ticketmaster'
                }
                newWaypointCollection = [...waypointsDetails, waypointDetails]
                currentDirectionsOptions.waypoints!.push(newWaypoint.dir)
                dispatch(addWaypoint(newWaypoint))
                dispatch(addWaypointsDetails(waypointDetails))
                calculateDirections(currentDirectionsOptions, center)
                setIsShowingDetails(false)
                setWaypointsDetails(newWaypointCollection)
            }
        }
    }

    return (
        <>  
            <MapOptions
            isLoading={isLoading} setIsLoading={setIsLoading} isHotelsSearching={isHotelsSearching} setHotelsSearching={setHotelsSearching}
            isBarsSearching={isBarsSearching} setBarsSearching={setBarsSearching} isRestaurantsSearching={isRestaurantsSearching} 
            setRestaurantsSearching={setRestaurantsSearching} handlePoi={handlePoi} isEventsSearching={isEventsSearching} setEventsSearching={setEventsSearching} />
            <!--<div className="w-full h-full grid grid-rows-1 grid-cols-12 overflow-hidden">-->
            <!--<div className="col-start-1 col-end-5">-->
            <!-- setRestaurantsSearching={setRestaurantsSearching} setMarkers={setMarkers} markers={markers} /> -->
            <div className="w-full h-full overflow-hidden flex sm:flex-row flex-col-reverse">
                <div className="w-full sm:w-1/3 h-1/2 sm:h-full  flex">
                    {isShowingDetails ?
                        <PlaceDetails content={placeDetails} setIsShowingDetails={setIsShowingDetails} addWaypoints={addWaypoints} isGoogleMapResult={isGoogleMapResult} eventContent={eventDetails} />
                    :
                        <TripDetails waypointsDetails={waypointsDetails} setWaypointsDetails={setWaypointsDetails} />
                    }
                </div>
                <div className="w-full sm:w-2/3 h-1/2 sm:h-full flex">
                    {directionsOptions ?
                            <GoogleMap
                            mapContainerStyle={style}
                            center={center!}
                            zoom={zoomDef}
                            onLoad={(map) => mapOnLoad(map)}
                            options={defaultMapOptions}
                            onDragEnd={mapOnChange}
                            onZoomChanged={onZoom}
                            >   
                                {directions && <DirectionsRenderer directions={directions} options={{preserveViewport: true}}/>}
                                {markers && markers.map((marker) => (
                                    // <Marker 
                                    //     key={marker.id}
                                    //     position={}
                                    //     label=''
                                    // />
                                    <OverlayView
                                        position={{lat: marker.lat, lng: marker.lng}}
                                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                        key={marker.id}
                                    >
                                            {renderSwitch(marker)}
                                    </OverlayView>
                                ))}
                            </GoogleMap>
                        :
                            <p>loading</p>
                    }
                </div>
            </div>
        </>
    )
}

export default MapView
