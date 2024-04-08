import React, { useEffect, useState } from "react"

const TripCard: React.FC<TripDetailsElement> = ({content}) => {

    const [fullAddress, setFullAddress] = useState('')
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const [photo, setPhoto] = useState('')
    const [classList, setClassList] = useState('max-w-sm rounded overflow-hidden shadow-lg flex bg-gray-100 mt-4 relative')
    const [onlyText, setOnlyText] = useState(false)
    useEffect(() => {
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
    }, [content])

    return (
        <div className={classList}>

            {content.place_id &&
                <div className="absolute top-0 right-0 mt-1 mr-1">
                    <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-3 w-3 flex flex-row" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            }

            {content.photos &&
                <div className="max-w-[30%] mr-3">
                    <img src={photo} className="w-full h-full" />
                </div>
            }
            <div className="flex flex-col w-full">
                {onlyText ?
                    <h3 className="m-2 text-lg flex justify-center">{content.name}</h3>
                :
                    <h3 className="m-0 text-md">{content.name}</h3>
                }
                {content.rating &&
                    <p className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 flex h-7 w-fit relative right-1.5 my-1">
                        {content.rating}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="ml-1">
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                         </svg>
                    </p>
                }
                {content.address_components &&
                    <p className="text-sm mb-1">{fullAddress}</p>
                }
            </div>
        </div>
    )
}

export default TripCard