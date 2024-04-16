import React from "react"

interface Props {
    content: WaypointsDetails
    photo: string
    fullAddress: string 
}

const TicketMasterTripCard: React.FC<Props> = ({content, photo, fullAddress}) => {

    return (
        <>
            {(content.images) &&
                <div className="max-w-[30%] mr-3">
                    <img src={photo} className="w-full h-full" />
                </div>
            }
            <div className="flex flex-col w-full p-3">
                <h3 className="m-0 text-md "><strong>{content.name}</strong></h3>
                {content.address &&
                    <p className="text-sm mb-1">{fullAddress}</p>
                }
            </div>
        </>
    )
}

export default TicketMasterTripCard