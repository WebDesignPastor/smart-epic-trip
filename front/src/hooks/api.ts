import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SetStateAction, useEffect, useState } from "react";

const fetchApi = (url: string, options?: AxiosRequestConfig) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response: AxiosResponse = await axios(url, options)
            setData(response.data)
        } catch (error){
            setError(error as SetStateAction<null>)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, isLoading, error}
}

export default fetchApi