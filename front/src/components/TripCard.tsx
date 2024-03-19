import React from "react"

const TripCard: React.FC<TripDetailsElement> = ({content, desc}) => {

    return (
        <div className="w-full bg-gray-100 min-h-16 flex justify-center items-center rounded-lg mb-4">
            <h3 className="font-bold text-md">{content}</h3>
            {desc && 
                <p>{desc}</p>
            }
        </div>
    )
}

export default TripCard