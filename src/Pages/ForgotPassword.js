import React, {useState, useEffect} from 'react'

// import react Helmet
import { Helmet, HelmetProvider } from 'react-helmet-async';


// react router dom
import {Link, useLocation, useHistory} from 'react-router-dom'

// import react hot toast
import toast, {Toaster} from 'react-hot-toast';


//Validator
import isEmail from 'validator/lib/isEmail';


// import axios
import axios from '../Util/axiosConfig'




// init ForgotPassword component
const ForgotPassword = () => {

     // init useLocation
    const location = useLocation()

    // init history
    const history = useHistory()

    // init useEffect
    useEffect(() => {
        // check if message in location.state
        if(location.state && location.state.message) {
            // error message
            toast.error(location.state.message)
            
            // remove message on forgot password route
            return history.replace({pathname: '/forgot/password', state: {message: ""}})
        }
    }, [location.state])

    // init email state
    const [email, setEmail] = useState("")

    // init Loading state
    const [Loading, setLoading] = useState(false)

    // init emailSent state
    const [emailSent, setEmailSent] = useState(false)

    // init handleChange function
    const handleChange = (e) => {
        // update email state
        setEmail(e.target.value)
    }

    // init handleSubmit 
    const handleSubmit = () => {
        // update Loading state
        setLoading(true)

        // get passwordResetData
        const passwordResetData = {
            email: email
        }

        // validate passwordResetData
        if(!(passwordResetData.email && isEmail(passwordResetData.email))) {
                // update Loading state
                setLoading(false)

                return toast.error("Please enter a valid email address")
        }


        // axios post request to server
        axios.post('/v1/api/forgot/password', passwordResetData)
        .then(({data}) => {
            // update Loading state
            setLoading(false)
            console.log(data)

            // check if not success
            if(!data.success) {
                return toast.error(data.data)
            }

            // update email sent
            setEmailSent(true)

            // update email state
            setEmail("")
            
            // return success
            return toast.success(data.data)
        })
        .catch((error) => {
            console.log(error)
            return toast.error("Oops! An error has occured")
        })
    }
    
    return (
        <HelmetProvider>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
        <React.Fragment>
            <Toaster/>
    
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-sm-12 col-md-12 align-self-center">
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

              <h2 className="page-title text-center">Forgot Password</h2>
              {emailSent &&  <div className="container w-50 mt-3">
              <div className="alert alert-success" role="alert">
                    Password Reset Email Sent Successfully. Please make sure to check your spam and trash if you can't find the email.
                </div>
              </div>}
            
            </div>

          </div>
        </div>

        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col"></div>
            <div className="col-lg-5 col-xlg-6 col-md-5">
              <div
                className="card border shadow-sm bg-white rounded"
                >
                <div className="card-body">
                  <form className="form-horizontal form-material">

                    <div className="form-group">
                      <label htmlFor="example-email" className="col-md-12">Email</label>
                      <div className="col-md-12">
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => handleChange(event)}
                          placeholder="Enter email address"
                          className="form-control form-control-line"
                          name="example-email"
                          id="example-email"/>
                      </div>
                    </div>
                   

                    <div className="form-group">
                      <div className="col-sm-12">
                        {Loading?  <button type="button" className="btn btn-primary btn-block" disabled>Loading...</button> : 
                         <button onClick={() => handleSubmit()} type="button" className="btn btn-primary btn-block">Reset Password</button>
                        }
                       
                      </div>
                      
                    </div>
                   
                  </form>
                </div>
               
              </div>
              <Link to="/login">Go back Login</Link>
            </div>
          

            <div className="col"></div>
          </div>
        </div>

        </React.Fragment>
         </HelmetProvider>
    )
}

export default ForgotPassword
