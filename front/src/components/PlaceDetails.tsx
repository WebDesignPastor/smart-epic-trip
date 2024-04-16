import React, { useEffect, useState } from "react"



interface Props {
    content: PlaceDetail | null | undefined
    setIsShowingDetails: Function
    addWaypoints: Function
    isGoogleMapResult: Boolean
    eventContent: EventDetail | null | undefined
}

const PlaceDetails: React.FC<Props> = ({content, setIsShowingDetails, addWaypoints, isGoogleMapResult, eventContent}) => {

    const [fullAddress, setFullAddress] = useState('')
    const [photo, setPhoto] = useState('')
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const [classList, setClassList] = useState('')
    useEffect(() => {
        if(isGoogleMapResult && content) {
            let newFullAddress = ''
            content.address_components.map((e) => {
                if(newFullAddress.length == 0) {
                    newFullAddress += e.short_name
                } else {
                    newFullAddress += ` ${e.short_name}`
                }
            })
            if(content.photos && content.photos[0].photo_reference) {
                setPhoto(`https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photo_reference=${content.photos[0].photo_reference}&maxwidth=1600`)
                setClassList('flex flex-col items-start px-3 pb-4')
            } else {
                let newClass = classList + ' mt-5'
                setClassList(newClass)
            }
            setFullAddress(newFullAddress)
        } else if(eventContent && !isGoogleMapResult){
            let newFullAddress = `${eventContent._embedded.venues[0].address.line1} ${eventContent._embedded.venues[0].city.name} ${eventContent._embedded.venues[0].postalCode} ${eventContent._embedded.venues[0].country.name}`
            setFullAddress(newFullAddress)
            setPhoto(eventContent.images[0].url)
        }
    }, [content, eventContent])

    const handleCloseBtn = () => {
        setIsShowingDetails(false)
    }

    const HandleAddBtn = (item: PlaceDetail | null | undefined, event: EventDetail | null | undefined) => {
        if(item) {
            addWaypoints(item, null)
        }

        if(event) {
            addWaypoints(null, event)
        }
    }

    return (
        <div className="h-full w-full bg-neutral-700 flex flex-col items-center px-3 pt-2">
            <div className="w-full bg-gray-100 min-h-16 flex justify-center items-center flex-col rounded-lg mb-4 relative md:w-auto">
                <div className="absolute top-0 left-0 z-10 sm:right-0 mt-1 mr-1 ml-1">
                    <button onClick={handleCloseBtn} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-3 w-3 flex flex-row" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {content ?
                    <div className="sm:max-w-sm rounded h-28 sm:h-auto overflow-hidden shadow-lg flex flex-row sm:flex-col relative">
                        {content.photos &&
                            <img src={photo} className="w-1/4 sm:w-full h-full sm:h-72 object-center object-cover"/>
                        }
                        <div className="sm:px-6 sm:py-4 p-1 flex sm:block flex-col sm:relative justify-around">
                            <div className="flex flex-row justify-between">
                                <div className="font-bold text-[16px] sm:text-xl sm:mb-2">{content.name}</div>
                                {content.rating &&
                                    <p className="bg-gray-200 rounded-full px-3 py-1  font-semibold text-gray-700 mr-2 mb-2 flex h-8 absolute sm:static top-1 right-1">
                                        {content.rating}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="ml-1">
                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                                        </svg>
                                    </p>
                                }
                            </div>
                            <p className="text-gray-700 text-[14px] sm:text-base"><strong className="text-black hidden sm:block">Adresse: </strong>{fullAddress}</p>

                        {window.innerWidth >= 640 && (
                            <a href={`tel:${content.international_phone_number}`}><strong>Tel: </strong>{content.international_phone_number}</a>
                        )}
                        </div>
                        {window.innerWidth >= 640 && (
                        <div className="flex justify-center items-center mb-4 ">
                            <button onClick={() => HandleAddBtn(content, null)} className="bg-[#86A873] hover:bg-gray-100 duration-300 transition-duration: 300ms text-gray-800 font-semibold py-2 px-4 border rounded-lg  sm:rounded-full shadow sm:w-[90%] mt-16 sm:mt-1 mb-1 ml-2 h-12">Ajouter au trip</button>
                        </div>
                        )}
                        {window.innerWidth < 640 && (
                            <div className="flex justify-center items-center mb-4 ">
                                <button onClick={() => HandleAddBtn(content, null)} className="bg-[#86A873] hover:bg-gray-100 duration-300 transition-duration: 300ms text-gray-800 font-semibold py-2 px-4 border rounded-lg  sm:rounded-full shadow sm:w-[90%] mt-16 sm:mt-1 mb-1 ml-2 h-12">Ajouter</button>
                            </div>
                        )}
                    </div>
                    :
                    eventContent &&
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    {eventContent.images &&
                        <img src={photo} className="w-full h-72 object-center object-cover"/>
                    }
                    <div className="sm:px-6 sm:py-4 p-1 flex sm:block flex-col sm:relative justify-around">
                        <div className="flex flex-row justify-between">
                            <div className="font-bold text-xl mb-2">{eventContent.name}</div>
                        </div>
                        <p className="text-gray-700 text-base"><strong className="text-black">Adresse: </strong>{fullAddress}</p>
                        <p className="text-gray-700 text-base"><strong className="text-black">Dates: </strong>{eventContent.dates.start.localDate}</p>
                    </div>
                    <div className="flex justify-center items-center mb-4 ">
                            <button onClick={() => HandleAddBtn(null, eventContent)} className="bg-[#86A873] hover:bg-gray-100 duration-300 transition-duration: 300ms text-gray-800 font-semibold py-2 px-4 border rounded-full shadow w-[90%]">Ajouter au trip</button>
                    </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PlaceDetails
