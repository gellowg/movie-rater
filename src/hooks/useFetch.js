import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import API from '../api-service';


function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [token] = useCookies(['user-token']);


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError();

            const data = await API.getMovies(token['user-token'])
                .catch(err => setError(err))

            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [token])
    return [data, loading, error]
}

export {useFetch}