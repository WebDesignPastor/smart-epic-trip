import { Markers } from "../components/MapView";

export const sortArrayByPropertyType = (array: Markers[], type: string): Markers[] => {
    return array.filter(item => item.type !== type)
}

export const checkIfArrayHasValue = (array: Markers[], type: string): boolean => {
    return array.some(item => item.type === type)
}