import React, {useState, useEffect} from 'react'

// import react hot toast
import toast, {Toaster} from 'react-hot-toast';


// import react router dom
import {Link, useHistory, useLocation} from 'react-router-dom'

// import react Helmet
import { Helmet, HelmetProvider } from 'react-helmet-async';

// import cookie js
import cookieJs from 'js-cookie'

// import axios
import axios from '../Util/axiosConfig'




const AccessTokenValidate = () => {

 
     // init useHistory
     const history = useHistory()


     // init Loading state 
     const [Loading , setLoading] = useState(false)

     // init accessToken state 
     const [accessToken, setAccessToken] = useState("")


    //  init handleSubmit 
    const handleSubmit = () => {
        // validate accessToken
        if(!accessToken) {
          return toast.error("Please provide a valid access token")
        }

        // axios post request to access token validator endpoint
        

    }
 

    return (
        <HelmetProvider>
                <Helmet>  
                        <title>Access Token Registration</title>  
                </Helmet>
            <React.Fragment>
            <Toaster/>

            <div className="page-breadcrumb">
          <div className="row">
            <div className="col-sm-12 col-md-12 align-self-center">
              <Link to="/">
              <img
                width="120"
                height="120"
                alt="ugonsa-logo"
                className="img-fluid"
                style={{
                margin: "auto",
                display: "block"
              }}
                src="/assets/images/ugonsa_logo.png"/>
                </Link>

              <h2 className="page-title text-center">Access Token Registration</h2>
              <p className="text-center mt-3">Provide a valid access token to create an UGONSA Account.</p>

            </div>

          </div>

        </div>

        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col"></div>
            <div className="col-lg-5 col-xlg-6 col-md-5">
              <div
                className="card border shadow-sm bg-white rounded"
                >
                <div className="card-body">
                  <form className="form-horizontal form-material">

                    <div className="form-group">
                      <label htmlFor="example-email" className="col-md-12">Access Token</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          value={accessToken}
                          onChange={(event) => setAccessToken(event.target.value)}
                          placeholder="Enter valid access token"
                          className="form-control form-control-line"
                          name="example-email"
                          id="example-email"/>
                      </div>
                    </div>
                   

                    <div className="form-group">
                      <div className="col-sm-12">
                        {Loading?  <button type="button" className="btn btn-primary btn-block" disabled>Loading...</button> : 
                         <button onClick={() => handleSubmit()} type="button" className="btn btn-primary btn-block">Continue</button>
                        }
                       
                      </div>
                    </div>
                    <p className="text-center">Don't have an access token?
                      <Link to="/create/account"> Go to Register Page </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>

            <div className="col"></div>
          </div>
        </div>

                
            </React.Fragment>
        </HelmetProvider>
    )
}

export default AccessTokenValidate
