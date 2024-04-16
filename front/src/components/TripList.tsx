import TripResume from "./TripResume"

const TripList = () => {

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="h-4/5 bg-red-300 w-5/6 flex flex-col items-center px-8">
                <h2 className="mt-4 text-xl">Mes trips :</h2>
                <div className="bg-sky-700 h-full my-4 w-full p-4 overflow-hidden no-scrollbar">
                    <TripResume />
                </div>
            </div>
        </div>
    )
}

export default TripList