import React from "react"

interface Props {
    content: WaypointsDetails
    photo: string
    fullAddress: string 
    onlyText: boolean
}

const GoogleTripCard: React.FC<Props> = ({content, photo, fullAddress, onlyText}) => {

    return (
        <>
            {(content.photos && content.photos.length > 0) ?
                <div className="max-w-[30%]">
                    <img src={photo} className="w-full h-full object-cover" />
                </div>
                :
                <div  className="max-w-[30%]">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" className="w-full h-full object-center object-cover" />
                </div>
            }
            <div className="flex flex-col w-full p-3">
                {onlyText ?
                    <h3 className="m-2 text-lg flex justify-center"><strong>{content.name}</strong></h3>
                :
                    <h3 className="m-0 text-md "><strong>{content.name}</strong></h3>
                }
                {content.address_components &&
                    <p className="text-sm mb-1">{fullAddress}</p>
                }
                <div className="flex items-end justify-end">
                    {content.rating &&
                        <p className="bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 flex h-7 w-fit right-1.5 items-end">
                            {content.rating}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="ml-1">
                                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                            </svg>
                        </p>
                    }
                </div>
            </div>
        </>
    )
}

export default GoogleTripCard