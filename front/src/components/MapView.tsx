import { DirectionsRenderer, GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api"
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import MarkerLogo from "./MarkerLogo"
import MapOptions from "./MapOptions"
import { calculateDistance } from "../utils/distance"

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

    const [center, setCenter] = useState({lat: 48.084328, lng: -1.68333})
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
    let waypoints: Waypoint[] = [
        { location: { lat: 47.666672, lng: -2.750000 }, stopover: true },
        { location: { lat: 47.766670, lng: -3.116670 }, stopover: true }
    ]
    let origin: google.maps.LatLngLiteral = {lat: 48.084328, lng: -1.68333}
    let destination: google.maps.LatLngLiteral = { lat: 47.750000, lng: -3.3666700 }
    let directionsOptions: google.maps.DirectionsRequest = {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: 'DRIVING' as google.maps.TravelMode,
        avoidHighways: true
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
                return <MarkerLogo  color="bg-lime-400" content="R"/>
            case 'hotel':
                return <MarkerLogo  color="bg-red-400" content="H"/>
            case 'bars':
                return <MarkerLogo  color="bg-blue-400" content="B"/>
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
            directionService.route(directionsOptions, (res, status) => {
                if(status === 'OK') {
                    setDirections(res)
                } else {
                    console.log('Error', status)
                }
            })
        }
    }

    const mapOnChange = () => {
        if(mapRef != null) {
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
            directionService.route(directionsOptions, (res, status) => {
                if(status === 'OK') {
                    setDirections(res)
                } else {
                    console.log('Error', status)
                }
            })
        }
    }

    return (
        <>  
            <MapOptions searchHotel={searchHotel} searhBars={searhBars} searhRestaurants={searhRestaurants} 
            isLoading={isLoading} setIsLoading={setIsLoading} isHotelsSearching={isHotelsSearching} setHotelsSearching={setHotelsSearching}
            isBarsSearching={isBarsSearching} setBarsSearching={setBarsSearching} isRestaurantsSearching={isRestaurantsSearching} 
            setRestaurantsSearching={setRestaurantsSearching} setMarkers={setMarkers} markers={markers} />
            <div className="w-full h-full">
                <GoogleMap
                    mapContainerStyle={style}
                    center={center}
                    zoom={zoomDef}
                    onLoad={(map) => mapOnLoad(map)}
                    options={defaultMapOptions}
                    onDragEnd={mapOnChange}
                    onZoomChanged={mapOnChange}
                >
                    {directions && <DirectionsRenderer directions={directions} />}
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
            </div>
        </>
    )
}

export default MapView