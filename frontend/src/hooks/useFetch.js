import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
    const [isloadiing, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const request = async (body) => {
        // console.log(body)
        setIsLoading(true)

        try {
            const res = await fetch(url, {
                ...options,
                body: JSON.stringify(body)
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error)
                setIsLoading(false)
            }

            if (res.ok) {
                setData(data)
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err)
            setError(err.message)
            setIsLoading(false)
        }
    }


    return {
        error, data, isloadiing, request, setError
    }
}