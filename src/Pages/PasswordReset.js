import React, {useState, useEffect} from 'react'


// import axios
import axios from '../Util/axiosConfig'

// import react router dom
import {useHistory, Link} from 'react-router-dom'

// import react Helmet
import { Helmet, HelmetProvider } from 'react-helmet-async';

//Validator
import equals from 'validator/lib/equals';


// import react hot toast
import toast, {Toaster} from 'react-hot-toast';



// init passwordReset component
const PasswordReset = (props) => {
    // get url param
    const passwordResetToken = props.match.params.token

    // init history
    const history = useHistory()

    // init tokenVerified state
    const [tokenVerified, setTokenVerified] = useState(false)

    // init BtnLoading
    const [btnLoading, setBtnLoading] = useState(false)

    // init userData
    const [userData, setUserData] = useState({})

    // init passwordResetData 
    const [passwordResetData, setPasswordResetData] = useState({
        newPassword: "",
        confirmPassword: ""
    })

    // destructure  passwordResetData
    const {newPassword, confirmPassword} = passwordResetData

    // init useEffect
    useEffect(() => {

        if(!passwordResetToken) {
            return history.push({pathname: '/login'})
        }

        // axios request to verify token
        axios.get(`/v1/api/password/reset/verify/${passwordResetToken}`)
        .then(({data}) => {
            // check if not success
            if(!data.success) {
                console.log(data.data)
                return history.push({pathname: '/forgot/password', state: {message: data.data}})
            }

            // update tokenVerified state
            setTokenVerified(true)

            // update userData
            setUserData(data.data)

            return toast.success(data.message)


        })
        .catch((error) => {
            console.log(error)
        })

    }, [])


    // init handleChange function 
    const handleChange = (data) => (e) => {
        // update passwordResetData
        setPasswordResetData({...passwordResetData, [data]: e.target.value})


    }


    // init handleSubmit 
    const handleSubmit = () => {
        // update btnLoading
        setBtnLoading(true)

        // get passwordResetData
        const _passwordResetData = {
            newPassword: passwordResetData.newPassword,
            confirmPassword: passwordResetData.confirmPassword,
            uid: userData.id,
            email: userData.email
        }

        // validate 
        if(!(_passwordResetData.newPassword && passwordResetData.confirmPassword)) {
              // update btnLoading
            setBtnLoading(false)

            // return error message
            return toast.error("Please enter new password and confirm password")
        }

        if(!equals(_passwordResetData.newPassword, _passwordResetData.confirmPassword)) {
              // update btnLoading
              setBtnLoading(false)

              // return error message
              return toast.error("Passwords are not equal")
        }

        if(_passwordResetData.newPassword.length < 6) {
             // update btnLoading
             setBtnLoading(false)
             
              // return error message
            return toast.error("Password must not be less than 6 characters")
        }

        if(!(_passwordResetData.uid && _passwordResetData.email)) {
            // update btnLoading
            setBtnLoading(false)
            console.log("User id and email not found")
            return toast.error("Oops! An error has occured")
        }

        // axios post request to reset password
        axios.post('/v1/api/user/password/reset', _passwordResetData)
        .then(({data}) => {
            // update btnLoading
            setBtnLoading(false)

            // check if not success
            if(!data.success) {
                return history.push({pathname: '/forgot/password', state: {message: data.data}})
            }

            // if success 
            return  history.push({pathname: '/login', state: {message: data.data}})
        })
        .catch((error) => {
            // update btnLoading
            setBtnLoading(false)

            console.log(error)
        })
        
    }


    return (
        <HelmetProvider>
        <React.Fragment>
            <Helmet>
                <title>Password Reset</title>
            </Helmet>

            <Toaster/>


            {!tokenVerified ? <div className="preloader">
                        <div className="lds-ripple">
                            <div className="lds-pos"></div>
                            <div className="lds-pos"></div>
                        </div>
                    </div>  : 
                    
                <div className="container">
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

                            <h2 className="page-title text-center">Change Password</h2>
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

                                {/* new Password */}
                                <div className="form-group">
                                <label htmlFor="example-email" className="col-md-12">New Password</label>
                                <div className="col-md-12">
                                    <input
                                    type="password"
                                    value={newPassword}
                                    onChange={handleChange('newPassword')}
                                    placeholder="Enter new password"
                                    className="form-control form-control-line"
                                   />
                                </div>
                                </div>

                                {/* confirm password */}
                                <div className="form-group">
                                <label htmlFor="example-email" className="col-md-12">Confirm Password</label>
                                <div className="col-md-12">
                                    <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleChange('confirmPassword')}
                                    placeholder="confirm password"
                                    className="form-control form-control-line"
                                    />
                                </div>
                                </div>
                            

                                <div className="form-group">
                                <div className="col-sm-12">
                                    {btnLoading?  <button type="button" className="btn btn-primary btn-block" disabled>Loading...</button> : 
                                    <button onClick={() => handleSubmit()} type="button" className="btn btn-primary btn-block">Submit</button>
                                    }
                                
                                </div>
                                
                                </div>
                            
                            </form>
                            </div>
                        
                        </div>
                        <Link to="/">Go back Home</Link>
                        </div>
                    

                        <div className="col"></div>
                    </div>
                    </div>
                </div>
            
            }

            
        </React.Fragment>
        </HelmetProvider>
    )
}


// export PasswordReset
export default PasswordReset
