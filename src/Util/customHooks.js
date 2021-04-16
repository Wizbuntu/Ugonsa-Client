// import useSwr
import useSwr from 'swr'

// import axios
import axios from './axiosConfig'


// init fetcher
const fetcher = (url) => axios.get(url).then(res => res.data)


// init useUser
export const useUser = (url) => {

    // get data and error from useSwr
    const { data, error } = useSwr(url, fetcher, { revalidateOnFocus: false })

    // return
    return {
        users: data,
        isLoading: !error && !data,
        isError: error
    }
}