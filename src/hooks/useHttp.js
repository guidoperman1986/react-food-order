import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json()

    if (!response.ok) {
        throw new Error(resData.message || 'No response received');
    }

    return resData;
}

export function useHttp(url, config) {
    const [data, setData] = useState([]);
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async function (data) {
        setIsLoading(true);
        try {
            const fetchedData = await sendHttpRequest(url, { ...config, body: JSON.stringify(data) });
            setData(fetchedData);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [url, config])

    useEffect(() => {
        if (config && config.method === 'GET') {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        error,
        isLoading,
        sendRequest
    };
}
