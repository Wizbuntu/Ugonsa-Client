import React, {useState, useEffect} from 'react'

// import react hot toast
import toast, {Toaster} from 'react-hot-toast';

// import loginValidation 
import {loginValidation} from '../Util/Validations'

// import react router dom
import {Link, useHistory, useLocation} from 'react-router-dom'

// import react Helmet
import { Helmet, HelmetProvider } from 'react-helmet-async';

// import cookie js
import cookieJs from 'js-cookie'

// import axios
import axios from '../Util/axiosConfig'



// init Login component
const Login = (props) => {

  // init useLocation
  const location = useLocation()

  // init useHistory
  const history = useHistory()

  // init useEffect
  useEffect(() => {
      if(location.state && location.state.message) {
        // update messageAlert
        setMessageAlert(location.state.message)

        // return success
       return toast.success(location.state.message)
      }
  }, [])

  // init messageAlert
  const [messageAlert, setMessageAlert] = useState("")

  // init login data state
  const [loginData, setLoginData] = useState({email: "", password: ""})

  // init Loading state
  const [Loading, setLoading] = useState(false)

  // destructure loginData
  const {email, password} = loginData



  // init handleChange function
  const handleChange = (data) => (e) => {
    // update loginData state
    setLoginData({
      ...loginData,
      [data]: e.target.value
    })

  }

  
  // init handleSubmit function
  const handleSubmit = () => {
    // update Loading state to true
    setLoading(true)

    // get loginData
    const getLoginData = {
      email: email,
      password: password
    }

    // validate login data
    const error = loginValidation(getLoginData)

    // check if error
    if(error) {
      // update Loading state to false
      setLoading(false)

      return toast.error(error)
    }

    // axios request to server
    axios.post('/v1/api/login', getLoginData)
    .then(({data}) => {

      // check if not success
      if(!data.success) {
        // update Loading state to false
        setLoading(false)

        return toast.error(data.data)
      }

      // update Loading state to false
      setLoading(false)

      // save token to cookie
      cookieJs.set('ugonsaToken', data.data)

      return history.push({pathname: '/dashboard'})

    })
    .catch((error) => {
      console.log(error)
    })
    

  }


  return (
    <React.Fragment>
      <HelmetProvider>

      <Toaster/>

      <Helmet>
              
                <title>Login - Ugonsa</title>
               
      </Helmet>
    
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

              <h2 className="page-title text-center">Login to your account</h2>

            </div>

          </div>
          
          {/* show alert message */}
            {messageAlert && <div className="container w-50 mt-3">
              <div className="alert alert-success" role="alert">
                    {messageAlert}
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

                    <div className="form-group">
                      <label htmlFor="example-email" className="col-md-12">Email</label>
                      <div className="col-md-12">
                        <input
                          type="email"
                          value={email}
                          onChange={handleChange('email')}
                          placeholder="Enter email address"
                          className="form-control form-control-line"
                          name="example-email"
                          id="example-email"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12">Password</label>
                      <div className="col-md-12">
                        <input
                          type="password"
                          value={password}
                          onChange={handleChange('password')}
                          placeholder="Enter password"
                          className="form-control form-control-line"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12">
                        {Loading?  <button type="button" className="btn btn-primary btn-block" disabled>Loading...</button> : 
                         <button onClick={() => handleSubmit()} type="button" className="btn btn-primary btn-block">Login</button>
                        }
                       
                      </div>
                      <p className="mt-3">
                        <Link to="/forgot/password">Forgot Password</Link>
                      </p>
                    </div>
                    <p className="text-center">Don't have an account?
                      <Link to="/create/account"> Register</Link> or <Link to="/token/register">Register with Access Token</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>

            <div className="col"></div>
          </div>
        </div>

     
        </HelmetProvider>
    </React.Fragment>
  )
}

export default Login
