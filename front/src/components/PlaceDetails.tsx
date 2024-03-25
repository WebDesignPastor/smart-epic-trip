import React, { useEffect, useState } from "react"

interface Props {
    content: PlaceDetail
}

// ajouter la photo 
// ajouter le btn pour ajouter au trajet
// pour la photo => nouvelel requete a google maps

const PlaceDetails: React.FC<Props> = ({content}) => {

    const [fullAddress, setFullAddress] = useState('')
    const [photo, setPhoto] = useState('')
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    useEffect(() => {
        let newFullAddress = ''
        content.address_components.map((e) => {
            if(newFullAddress.length == 0) {
                newFullAddress += e.short_name
            } else {
                newFullAddress += ` ${e.short_name}`
            }
        })
        if(content.photos[0]) {
            setPhoto(`https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photo_reference=${content.photos[0].photo_reference}&maxwidth=1600`)
        }
        setFullAddress(newFullAddress)
    }, [content])
    return (
        <div className="h-full w-full bg-neutral-700 flex flex-col items-center px-3">
            <div className="w-full bg-gray-100 min-h-16 flex justify-center items-center flex-col rounded-lg mb-4">
                <div className="object-cover my-3">
                    <img src={photo} className="px-2 max-h-42"/>
                </div>
                <h2 className="text-center px-2">{content.name}</h2>
                <div className="flex flex-col items-center">
                    <p className="text-center pb-2">{fullAddress}</p>
                    <p className="pb-2">{content.international_phone_number}</p>
                    <p className="pb-4 flex items-center">
                        {content.rating}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="ml-1">
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                        </svg>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PlaceDetails