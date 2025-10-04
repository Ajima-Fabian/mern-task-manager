import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
    const [isLoadiing, setIsLoading] = useState(false)
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
                return
            }

            if (res.ok) {
                setData(data)
                setIsLoading(false)

                return data
            }
        } catch (err) {
            console.log(err)
            setError(err.message)
            setIsLoading(false)
        }
    }


    return {
        error, data, isLoadiing, request, setError
    }
}