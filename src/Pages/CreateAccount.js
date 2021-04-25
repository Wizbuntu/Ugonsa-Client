import React, {useState, useEffect} from 'react'

// import react Helmet
import { Helmet, HelmetProvider } from 'react-helmet-async';


// import react router dom
import {Link, useHistory, useLocation} from 'react-router-dom'

// import react hot toast
import toast, {Toaster} from 'react-hot-toast';

// import create Account validations
import {createAccountValidation} from '../Util/Validations'


// import axios
import axios from '../Util/axiosConfig'


// init create Account component
const CreateAccount = () => {

    // init useLocation 
    const location = useLocation()

    // init history
    const history = useHistory()



    // init useEffect
    useEffect(() => {
       // check if message in location.state
       if(location.state && location.state.message) {

        // update showError state
        setShowError({...showError, errorStatus: true, errorMessage: location.state.message})
        
        // error message
        toast.error(location.state.message)
       
      return history.replace({pathname: '/create/account', state: {message: ''}})
      }
    }, [location.state])



    // init accountData state 
    const [accountData, setAccountData] = useState({
        firstName: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    // init Loading state
    const [Loading, setLoading] = useState(false)

     // init showSuccess state
    const [showSuccess, setShowSuccess] = useState({
      successStatus: false,
      successMessage: null
    })

    // init showError state
    const [showError, setShowError] = useState({
      errorStatus: false,
      errorMessage: null
    })

    // destructure successStatus
    const {successStatus, successMessage} = showSuccess

    // destructure errorStatus
    const {errorStatus, errorMessage} = showError


    // destructure accountData
    const {firstName, surname, email, password, confirmPassword} = accountData



    // init handleChange function
    const handleChange = (data) => (e) => {
        // update accountDat state 
        setAccountData({...accountData, [data]: e.target.value})

        console.log(accountData)
    }


// ===============Init handleSubmit function ====================
    const handleSubmit = () => {
      // update Loading state
      setLoading(true)

        // get accountData
        const _accountData = {
            firstName: firstName,
            surname : surname, 
            email : email, 
            password: password, 
            confirmPassword: confirmPassword
        }

        // validate
        const error = createAccountValidation(_accountData)

        // check if error
        if(error) {
          // update Loading state
          setLoading(false)

            return toast.error(error)
        }

        // post request to create acount endpoint
        axios.post('/v1/api/create/account', _accountData)
        .then(({data}) => {
          // update Loading state
           setLoading(false)

          // check if not successful
          if(!data.success) {
            return toast.error(data.data)
          }

          // update ShowSuccess
          setShowSuccess({...showSuccess, successStatus: true, successMessage: data.data})

          // return success toast
          return toast.success(data.data)
        })
        .catch((error) => {
          // update Loading state 
          setLoading(false)

          console.log(error)
          return toast.error("Oops! An error has occured")
        })
        
    }

    return (
        <HelmetProvider>
        <React.Fragment>
            <Helmet>
                <title>Create Account - Ugonsa</title>
            </Helmet>

            <Toaster/>

            <div className="page-breadcrumb">
          <div className="row">
            <div className="col"></div>
            <div className="col-sm-4 col-md-4 align-self-center">
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

              <h2 className="page-title text-center">Create Account</h2>

            </div>
            <div className="col"></div>

          </div>
          
          {/* show success message */}
            {successStatus && <div className="container w-50 mt-3">
              <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
              </div>}

          {/* show error message */}
          {errorStatus && <div className="container w-50 mt-3">
              <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
              </div>}
          
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

                    {/* first name */}
                    <div className="form-group">
                      <label htmlFor="first-name" className="col-md-12">Frist Name</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          value={firstName}
                          onChange={handleChange('firstName')}
                          placeholder="Enter First Name"
                          className="form-control form-control-line"
                          id="first-name"/>
                      </div>
                    </div>

                    {/* surname */}
                    <div className="form-group">
                      <label htmlFor="surname" className="col-md-12">Surname</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          value={surname}
                          onChange={handleChange('surname')}
                          placeholder="Enter Surname"
                          id="surname"
                          className="form-control form-control-line"/>
                      </div>
                    </div>

                    {/* email */}
                    <div className="form-group">
                      <label htmlFor="email" className="col-md-12">Email</label>
                      <div className="col-md-12">
                        <input
                          type="email"
                          value={email}
                          onChange={handleChange('email')}
                          placeholder="Enter Email Address"
                          id="email"
                          className="form-control form-control-line"/>
                      </div>
                    </div>

                    {/* password */}
                    <div className="form-group">
                      <label htmlFor="password" className="col-md-12">Password</label>
                      <div className="col-md-12">
                        <input
                          type="password"
                          value={password}
                          onChange={handleChange('password')}
                          placeholder="Enter Password"
                          id="password"
                          className="form-control form-control-line"/>
                      </div>
                    </div>

                     {/* confirm Password */}
                     <div className="form-group">
                      <label htmlFor="confirm-password" className="col-md-12">Confirm Password</label>
                      <div className="col-md-12">
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={handleChange('confirmPassword')}
                          placeholder="Confirm Password"
                          id="confirm-password"
                          className="form-control form-control-line"/>
                      </div>
                    </div>


                    <div className="form-group">
                      <div className="col-sm-12">
                        {Loading?  <button type="button" className="btn btn-primary btn-block" disabled>Loading...</button> : 
                         <button onClick={() => handleSubmit()} type="button" className="btn btn-primary btn-block">Create Account</button>
                        }
                       
                      </div>
                     
                    </div>
                    <p className="text-center">Already have an account?
                      <Link to="/login"> Login</Link>
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

export default CreateAccount
