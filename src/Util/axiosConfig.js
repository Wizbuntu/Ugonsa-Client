// import axios 
import axios from 'axios'


// import js-cookie
import cookieJs from 'js-cookie'

// configure axios intercept
axios.interceptors.request.use((config) => {
    // init ugonsaToken
    const ugonsaToken = cookieJs.get('ugonsaToken')

    // check if ugonsaToken
    if (ugonsaToken) {
        // append token to request headers
        config.headers.authorization = ugonsaToken
    }

    return config
})



// export axios
export default axios