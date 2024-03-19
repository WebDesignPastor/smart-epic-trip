import { DirectionsRenderer, GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api"
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import MarkerLogo from "./MarkerLogo"
import MapOptions from "./MapOptions"
import { calculateDistance } from "../utils/distance"
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import TripDetails from "./TripDetails"
import { useNavigate } from "react-router-dom"

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
    const baseDirections = useSelector((state: RootState) => state.app.directions)
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
    
    const { isLoaded } = useJsApiLoader({ googleMapsApiKey })

    if(!isLoaded) {
        return null
    }

    // set the route 
    const directionService = new google.maps.DirectionsService()
    let origin: google.maps.LatLngLiteral = {lat: 48.084328, lng: -1.68333}
    let destination: google.maps.LatLngLiteral = { lat: 47.750000, lng: -3.3666700 }
    let waypoints: Waypoint[] = [
        { location: { lat: 47.666672, lng: -2.750000 }, stopover: true },
        { location: { lat: 47.766670, lng: -3.116670 }, stopover: true }
    ]
    let directionsOptions: google.maps.DirectionsRequest = {
        origin: origin,
        destination: destination,
        // waypoints: waypoints,
        travelMode: 'DRIVING' as google.maps.TravelMode,
        avoidHighways: false
    }
    // const createMarker = (lat: number, lng: number, id: string, centerCoord: any) => {
    //     if(centerCoord) {
    //         const newMarker = {
    //             id: id,
    //             lat: lat,
    //             lng: lng
    //         }
    //         setMarkers([...markers, newMarker])
    //     }
    // }

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
        console.log(details.data.result)
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
            if(baseDirections[0]) {
                directionsOptions.origin = baseDirections[0].origin
                directionsOptions.destination = baseDirections[0].destination
                directionService.route(directionsOptions, (res, status) => {
                    if(status === 'OK') {
                        setCenter(baseDirections[0].origin)
                        setDirections(res)
                    } else {
                        console.log('Error', status)
                    }
                })
            }
        }
    }

    const mapOnChange = () => {
        if(mapRef != null) {
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
            if(baseDirections[0]) {
                directionsOptions.origin = baseDirections[0].origin
                directionsOptions.destination = baseDirections[0].destination
                directionService.route(directionsOptions, (res, status) => {
                    if(status === 'OK') {
                        setCenter(newCenter)
                        setDirections(res)
                    } else {
                        console.log('Error', status)
                    }
                })
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
            if(baseDirections[0]) {
                directionsOptions.origin = baseDirections[0].origin
                directionsOptions.destination = baseDirections[0].destination
                directionService.route(directionsOptions, (res, status) => {
                    if(status === 'OK') {
                        setCenter(newCenter)
                        setDirections(res)
                    } else {
                        console.log('Error', status)
                    }
                })
            }
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
                    <TripDetails />
                </div>
                <div className="col-start-5 col-end-13">
                    {baseDirections[0] ?
                            <GoogleMap
                            mapContainerStyle={style}
                            center={center}
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