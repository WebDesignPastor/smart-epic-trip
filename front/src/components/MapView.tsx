import { DirectionsRenderer, GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api"
import React, { useEffect, useRef, useState } from "react"
import axios, { all } from "axios"
import MarkerLogo from "./MarkerLogo"
import MapOptions from "./MapOptions"
import { calculateDistance } from "../utils/distance"
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import TripDetails from "./TripDetails"
import { useNavigate } from "react-router-dom"
import PlaceDetails from "./PlaceDetails"
import { useDispatch } from "react-redux"
import { addWaypoint, setDestination, setOrigin } from "../slices/store"

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

interface Waypoint {
    location: google.maps.LatLngLiteral
    stopover: boolean
}

const MapView: React.FC<Props> = ({width, height, zoomDef, margin}) => {

    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const apiUrl = import.meta.env.VITE_API_URL
    const directionsOptions = useSelector((state: RootState) => state.app.directionsOptions)
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    const [center, setCenter] = useState<{lat: number, lng: number}>()
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
    const mapRef = useRef<google.maps.Map>()
    const [markers, setMarkers] = useState<Markers[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [mapRadius, setMapRadius] = useState(50000)
    const [isBarsSearching, setBarsSearching] = useState(false)
    const [isHotelsSearching, setHotelsSearching] = useState(false)
    const [isRestaurantsSearching, setRestaurantsSearching] = useState(false)
    const [placeDetails, setPlaceDetails] = useState<PlaceDetail>()
    const [isShowingDetails, setIsShowingDetails] = useState(false)
    const [isRouteUpdating, setRouteUpdating] = useState(false)
    
    const { isLoaded } = useJsApiLoader({ googleMapsApiKey })

    if(!isLoaded) {
        return null
    }

    // set the route 
    const directionService = new google.maps.DirectionsService()

    const createCustomMarker = (data: PlaceApiResResult[], type: string) => {
        let newMarkerCollection: Markers[] = markers
        data.map((res: PlaceApiResResult) => {
            if(!newMarkerCollection.find((e:Markers) => e.id === res.place_id)) {
                newMarkerCollection.push({lat: res.geometry.location.lat, lng: res.geometry.location.lng, id: res.place_id, type: type})
            }
        })
        setMarkers(newMarkerCollection)
        setIsLoading(false)
    }

    const onMarkerClick = async (index: string) => {
        setIsLoading(true)
        const details = await axios.get(`${apiUrl}/details/${index}`)
        let detailsResult = details.data.result 
        setPlaceDetails(detailsResult)
        setIsShowingDetails(true)
        setIsLoading(false)
        // donc besoin du place id de l'endroit
    }

    const searchHotel = async () => {
        setIsLoading(true)
        const centerCoord = mapRef.current?.getCenter()
        const hotel = await axios.get(`${apiUrl}/hotels/all?location=${centerCoord?.lat()},${centerCoord?.lng()}&radius=${mapRadius}`)
        if(hotel.data.results) {
            const results = hotel.data.results
            createCustomMarker(results, 'hotel')
        }
    }

    const searhBars = async () => {
        setIsLoading(true)
        const centerCoord = mapRef.current?.getCenter()
        const bars = await axios.get(`${apiUrl}/bars/all?location=${centerCoord?.lat()},${centerCoord?.lng()}&radius=${mapRadius}`)
        if(bars.data.results) {
            const results = bars.data.results
            createCustomMarker(results, 'bars')
        }
    }

    const searhRestaurants = async () => {
        setIsLoading(true)
        const centerCoord = mapRef.current?.getCenter()
        const restaurant = await axios.get(`${apiUrl}/restaurants/all?location=${centerCoord?.lat()},${centerCoord?.lng()}&radius=${mapRadius}`)
        if(restaurant.data.results) {
            const results = restaurant.data.results
            createCustomMarker(results, 'restaurant')
        }
    }

    const renderSwitch = (marker: Markers) => {
        switch (marker.type) {
            case 'restaurant' :
                return <MarkerLogo  color="bg-lime-400" content="R" handler={onMarkerClick} index={marker.id}/>
            case 'hotel':
                return <MarkerLogo  color="bg-red-400" content="H" handler={onMarkerClick} index={marker.id}/>
            case 'bars':
                return <MarkerLogo  color="bg-blue-400" content="B" handler={onMarkerClick} index={marker.id}/>
        }
    }

    const calculateDirections = (options: any, center: any) => {
        setRouteUpdating(true)
        directionService.route(options, (res, status) => {
            if(status === 'OK') {
                setCenter(center)
                setDirections(res)
                setRouteUpdating(false)
            } else {
                console.log('Error', status)
            }
        })
    }

    const clearRoute = () => {
        setDirections(null)
    }

    const mapOnLoad = (map: google.maps.Map) => {
        if(map) {
            clearRoute()
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
            clearRoute()
            setIsShowingDetails(false)
            let newCenter = {lat: mapRef.current?.getCenter()?.lat()!, lng: mapRef.current?.getCenter()?.lng()! }
            const bounds = mapRef.current?.getBounds()
            if(bounds) {
                const ne = bounds.getNorthEast()
                const sw = bounds.getSouthWest()
                const distance = Math.round(calculateDistance(ne.lat(), ne.lng(), sw.lat(), ne.lng()) / 2)
                
                setMapRadius(distance)
                setMarkers([])
                setBarsSearching(false)
                setHotelsSearching(false)
                setRestaurantsSearching(false)
            }
            if(directionsOptions) {
                calculateDirections(directionsOptions, newCenter)
            }
        }
    }

    const onZoom = () => {
        if(mapRef != null) {
            clearRoute()
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

    const addWaypoints = (item: PlaceDetail) => {
        if(directionsOptions) {
            clearRoute()
            let newWaypoint = {
                location: {lat: item.geometry.location.lat, lng: item.geometry.location.lng}, stopover: true
            }
            let currentDirectionsOptions = JSON.parse(JSON.stringify(directionsOptions))
            currentDirectionsOptions.waypoints!.push(newWaypoint)
            dispatch(addWaypoint(newWaypoint))
            calculateDirections(currentDirectionsOptions, center)
            setIsShowingDetails(false)
        }
    }

    return (
        <>  
            <MapOptions searchHotel={searchHotel} searhBars={searhBars} searhRestaurants={searhRestaurants} 
            isLoading={isLoading} setIsLoading={setIsLoading} isHotelsSearching={isHotelsSearching} setHotelsSearching={setHotelsSearching}
            isBarsSearching={isBarsSearching} setBarsSearching={setBarsSearching} isRestaurantsSearching={isRestaurantsSearching} 
            setRestaurantsSearching={setRestaurantsSearching} setMarkers={setMarkers} markers={markers} />
            <div className="w-full h-full grid grid-rows-1 grid-cols-12">
                <div className="col-start-1 col-end-5">
                    {isShowingDetails ?
                        <PlaceDetails content={placeDetails!} setIsShowingDetails={setIsShowingDetails} addWaypoints={addWaypoints} />
                    :
                        <TripDetails />
                    }
                </div>
                <div className="col-start-5 col-end-13">
                    {directionsOptions ?
                            <GoogleMap
                            mapContainerStyle={style}
                            center={center}
                            zoom={zoomDef}
                            onLoad={(map) => mapOnLoad(map)}
                            options={defaultMapOptions}
                            onDragEnd={mapOnChange}
                            onZoomChanged={onZoom}
                            >   
                                {directions && !isRouteUpdating && <DirectionsRenderer directions={directions} options={{preserveViewport: true}}/>}
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