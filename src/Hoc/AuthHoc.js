import React, {useEffect, useState, useRef} from 'react'

// react router dom
import {Route, useHistory} from 'react-router-dom'

// import axios
import axios from '../Util/axiosConfig'

// loadjs
import loadjs from 'loadjs'

// import Navbar
import Navbar from '../Components/Navbar'

// import Sidebar
import Sidebar from '../Components/Sidebar'



// Init AuthHoc
const AuthHoc = ({component: Component, ...rest}) => {

    // init useHistory
    const history = useHistory()

    // init userState
    const [User, setUser] = useState({})

    // init useRef
    const Loading = useRef(true)


    // init useEffect
    useEffect(() => {
        axios.get('/v1/api/verify')
        .then(({data}) => {

            loadjs('/dist/js/sidebarmenu.js', function() {
                loadjs('/dist/js/custom.min.js')
            })

            // update Loading Ref
            Loading.current = false

            // check if login success
            if(!data.success) {

                // redirect to login
                return history.push({pathname: '/login'})

            }else {

                 // setUser
                 setUser(data.data)
                
                //  check if user is not admin
                if(!data.data.admin) {
                    return history.push({pathname: '/profile'})
                }               
            }

        }, [])
        .catch((error) => {
            console.log(error)
            console.log("error has occured")
            // redirect to login
            return history.push({pathname: '/login'})
        })
      
    }, [])

     // call javascript external libraries       
    loadjs('/assets/extra-libs/sparkline/sparkline.js', function() {
            loadjs('/dist/js/waves.js')
            })


    // check if loading 
    if(Loading.current) {
        return <React.Fragment>
                <div className="preloader">
                        <div className="lds-ripple">
                            <div className="lds-pos"></div>
                            <div className="lds-pos"></div>
                        </div>
                    </div>
        </React.Fragment>
    }

    return (
        // return Route
        <Route {...rest} render={(props) => {
            
            return  <React.Fragment>
               
                     <div id="main-wrapper" style={{overflow: "inherit"}} data-navbarbg="skin6" data-theme="light" data-layout="vertical" data-sidebartype="full" data-boxed-layout="full">
                     <Navbar authUser = {User}/>
                     <Sidebar authUser = {User}/>
                     <div className="page-wrapper" style={{backgroundColor: "#efefef"}}>
                     {/* return Component */}
                     <Component {...props} authUser = {User}/>    
                     </div>
                     </div>
                
                
                </React.Fragment>
        }} />
    )
}

// export AuthHoc
export default AuthHoc
