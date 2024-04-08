import React, { useEffect, useState } from "react"

interface Props {
    content: PlaceDetail
    setIsShowingDetails: Function
    addWaypoints: Function
}

// ajotuer la logique du btn pour ajouter au trip => waypoints
// ajouter la croix pour fermer la card

const PlaceDetails: React.FC<Props> = ({content, setIsShowingDetails, addWaypoints}) => {

    const [fullAddress, setFullAddress] = useState('flex flex-col items-start px-3 pb-4')
    const [photo, setPhoto] = useState('')
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const [classList, setClassList] = useState('')
    useEffect(() => {
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
    }, [content])

    const handleCloseBtn = () => {
        setIsShowingDetails(false)
    }

    const HandleAddBtn = (item: PlaceDetail) => {
        addWaypoints(item)
    }

    return (
        <div className="h-full w-full bg-neutral-700 flex flex-col items-center px-3">
            <div className="w-full bg-gray-100 min-h-16 flex justify-center items-center flex-col rounded-lg mb-4 relative md:w-auto">
                <div className="absolute top-0 right-0 mt-1 mr-1">
                    <button onClick={handleCloseBtn} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-3 w-3 flex flex-row" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>



                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    {content.photos &&
                        <img src={photo} className="w-full h-72 object-center object-cover"/>
                    }
                    <div className="px-6 py-4 relative">
                        <div className="flex flex-row justify-between">
                            <div className="font-bold text-xl mb-2">{content.name}</div>
                            {content.rating &&
                                <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex h-8">
                                    {content.rating}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="ml-1">
                                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                                    </svg>
                                </p>
                            }
                        </div>
                        <p className="text-gray-700 text-base"><strong className="text-black">Adresse: </strong>{fullAddress}</p>
                        <a href={`tel:${content.international_phone_number}`}><strong>Tel: </strong>{content.international_phone_number}</a>
                    </div>
                    <div className="flex justify-center items-center mb-4 ">
                        <button onClick={() => HandleAddBtn(content)} className="bg-[#86A873] hover:bg-gray-100 duration-300 transition-duration: 300ms text-gray-800 font-semibold py-2 px-4 border rounded-full shadow w-[90%]">Ajouter au trip</button>
                    </div>
                </div>





            </div>
        </div>
    )
}

export default PlaceDetails