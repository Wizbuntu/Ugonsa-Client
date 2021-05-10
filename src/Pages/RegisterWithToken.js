import React, {useState, useEffect} from 'react'

// import UploadUtil
import UploadUtil from '../Util/uploadUtil'

// import react date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// react country and state
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

// import react hot toast
import toast, { Toaster } from 'react-hot-toast';

// react router dom
import {Link, useHistory} from 'react-router-dom'

// import registerValidation 
import {tokenRegistrationValidation} from '../Util/Validations'

// Footer
import Footer from '../Components/Footer'


// import axios 
import axios from '../Util/axiosConfig'

// import react Helmet
import { Helmet, HelmetProvider } from 'react-helmet-async';



// init Register Page
const RegisterWithToken = (props) => {

    // get confirmationToken
    const confirmationToken = props.match.params.token

    // init useHistory
    const history = useHistory()

    // init dateOfBirth
    const [dateofBirth, setDateOfBirth] = useState(new Date());

    // init Loading state
    const [Loading, setLoading] = useState(false)

    // init registration state
    const [registrationData, setRegistrationData] = useState({
        firstName: "",
        surname: "",
        otherName: "", 
        email: "",
        confirmEmail: "",
        phone: "",
        profile_pic: "",
        sex: "",
        lga: "",
        postal_address: "",
        password: "",
        confirmPassword: "",
        accessToken: ""

    })

    // init country state
    const [country, setCountry] = useState("")

    // init state_of_origin
    const [state_of_origin, setStateOfOrigin] = useState("")



    // init qualificationData state
    const [qualificationData, setQualificationData] = useState([{
        qualification: "",
        universityAttended: "",
        yearofEntry: "",
        yearofGraduation: "",
        regNumber: ""
    }])

    // destructure registrationData
    const {firstName, surname, otherName, email, confirmEmail, phone, profile_pic, sex, lga, postal_address, password, confirmPassword, accessToken } = registrationData
    
    // init handleChange 
    const handleChange = (data) => (e) => {
        // update registration Data
        setRegistrationData({...registrationData, [data]: e.target.value})

    }


    // init handleAddInputField 
    const handleAddInputFields = () => {

        // spread the values in state
        const stateValues = [...qualificationData];

        // push an empty object in array
        stateValues.push({ 
        qualification: "",
        universityAttended: "",
        yearofEntry: "",
        yearofGraduation: "",
        regNumber: "" });
    
        // assign to the state
        setQualificationData(stateValues);
      };


      // handle Remove Input Fields
    const handleRemoveInputFields = (index) => {
            // spread the values in state
            const stateValues = [...qualificationData];

            // remove the index value from array
            stateValues.splice(index, 1);

            // assign to the state
            setQualificationData(stateValues);
    };

    // init handleQualificationChange
    const handleQualificationChange = (event, index, field) => {

        // spread qualificationData
        const stateValues = [...qualificationData]

        // get index and field 
        stateValues[index][field] = event.target.value

        // update qualification Data
        setQualificationData(stateValues)
    }
    



    // init handleSubmit function
    const handleSubmit = () => {
        // update loading to true
        setLoading(true)

        // get RegisterData
        const registerData = {
            firstName: firstName,
            surname: surname,
            otherName: otherName,
            email: email,
            confirmEmail: confirmEmail,
            phone: phone,
            profile_pic: profile_pic,
            sex: sex,
            country: country,
            state_of_origin: state_of_origin,
            lga: lga,
            address: postal_address,
            password: password,
            confirmPassword: confirmPassword,
            accessToken: accessToken,
            dob: dateofBirth,
            qualifications: qualificationData
        }

        // validate registerData
        const error = tokenRegistrationValidation(registerData)

        // check if error
        if(error) {
            // update loading to false
            setLoading(false)

            return toast.error(error)
        }

        // axios request to token register endpoint 
        axios.post('/v1/api/access/token/register', registerData)
        .then(({data}) => {
            // update Loading
            setLoading(false)

            // check if not success
             if(!data.success) {
                 return toast.error(data.data)
             }

            // redirect to login
            history.push({pathname: '/login', state: {message: data.data}})
        })
        .catch((error) => {
            // update Loading
            setLoading(false)

            console.log(error)
        })

    }


    return (
        <React.Fragment>
            <HelmetProvider>

            <Toaster/>

            <Helmet>
              
              <title>Register - Ugonsa</title>
             
            </Helmet>

            <div className="page-container" style={{backgroundColor: "#efefef"}}>
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-sm-5 col-md-5 align-self-center mb-3">
                        <Link to="/"><img width="150" height="150" alt="ugonsa-logo" className="img-fluid" style={{margin: "auto", display: "block"}} src="/assets/images/ugonsa_logo.png"/></Link>

                            <h2 className="page-title text-center">Access Token Registration</h2>
                            <h5 className="text-center mt-4">Please fill the form below to complete your registration</h5>
                            <p className="text-center mt-2">Note: You will required to provide an access token to create your account</p>
                        </div>
                        <div className="col"></div>
                        
                    </div>
                </div>
        
                <div className="container-fluid">
               
                <div className="row pr-3 pl-3">
                   
                    <div className="col-lg-4 col-xlg-3 col-md-5">
                        <div className="card rounded shadow-sm bg-white">
                            <div className="card-body">
                                <center className="m-t-30">
                                   
                                    <UploadUtil uploadImageUrl={(image_url) => setRegistrationData({...registrationData, profile_pic: image_url})}/>

                                    <p>Note: Passport photograph must be less than 300kb</p>
                                </center>
                            </div>
                            <div>
                            </div>
                        </div>

                        {/* About Access token registration */}
                        <div className="card rounded shadow-sm bg-white">
                            <div className="card-body">
                                <h4 className="page-title p-2"><b>About Access Token Registration (ATR)</b></h4>

                                <p className="mt-3 p-2">Access Token Registration (ATR) is an alternative registration process provided by UGONSA to enable you create your account without online payment.</p>

                                <p className="p-2"><b>Steps to register with access token</b></p>

                                <ul className="p-2">
                                    <li className="p-2">Make payments (Registration Fee: &#8358;2000) to UGONSA bank account: <b>3089525712</b>,  Bank: <b>FirstBank</b></li>
                                    <li className="p-2">Send proof of payment via email to <b>info@ugonsa.org</b> or <b>gnan2ugonsa@gmail.com</b></li>
                                    <li className="p-2">Wait for 24 hours to recieve your access token</li>
                                    <li className="p-2">Enter your access token in the "Access Token" field to create your account.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-lg-8 col-xlg-9 col-md-7">
                        <div className="card rounded shadow-sm bg-white">
                            <div className="card-body">
                                <form className="form-horizontal form-material">
                                    <div className="row">
                                        <div className="col-md-4">
                                                {/* Surname */}
                                                <div className="form-group">
                                                    <label className="col-md-12">Surname</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter Surname" value={surname}  onChange={handleChange('surname')} className="form-control form-control-line"/>
                                                    </div>
                                                </div>
                                        </div>

                                        <div className="col-md-4">
                                                {/* First Name */}
                                                <div className="form-group">
                                                    <label className="col-md-12">First Name</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter First Name" value={firstName} onChange={handleChange('firstName')} className="form-control form-control-line"/>
                                                    </div>
                                                </div>
                                        </div>

                                        <div className="col-md-4">
                                                {/* Other Name */}
                                                <div className="form-group">
                                                    <label className="col-md-12">Other Name (if any)</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter Other Name" value={otherName} onChange={handleChange('otherName')} className="form-control form-control-line"/>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    
                                    

                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Email */}
                                            <div className="form-group">
                                                <label htmlFor="email" className="col-md-12">Email</label>
                                                <div className="col-md-12">
                                                    <input type="email" placeholder="e-mail address" value={email} onChange={handleChange('email')} className="form-control form-control-line"/>
                                                    <small>Please provide a valid email to enable you recieve informations.</small>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                                 {/* Confirm Email */}
                                            <div className="form-group">
                                                <label htmlFor="email" className="col-md-12">Confirm Email</label>
                                                <div className="col-md-12">
                                                    <input type="email" placeholder="confirm e-mail address" value={confirmEmail} onChange={handleChange('confirmEmail')} className="form-control form-control-line"/>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* date of birth */}
                                        <div className="form-group">
                                            <label htmlFor="dob" className="col-md-12">Date of Birth</label>
                                            <div className="col-md-12">
                                            <DatePicker className="form-control form-control-line" selected={dateofBirth} onChange={date => setDateOfBirth(date)} />
                                            </div>
                                        </div>

                                        </div>

                                        {/* Phone */}
                                        <div className="col-md-6">
                                            
                                            <div className="form-group">
                                                    <label htmlFor="phone" className="col-md-12">Phone Number</label>
                                                    <div className="col-md-12">
                                                        <input type="number" placeholder="Enter Phone Number" value={phone} onChange={handleChange('phone')} className="form-control form-control-line"/>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>

                                    

                                    

                                     {/* Sex */}
                                     <div className="form-group">
                                        <label className="col-sm-12">Gender</label>
                                        <div className="col-sm-12">
                                            <select onChange={handleChange('sex')} className="form-control form-control-line">
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Country*/}
                                            <div className="form-group">
                                                <label className="col-sm-12">Country</label>
                                                <div className="col-sm-12">
                                                <CountryDropdown
                                                    classes="form-control form-control-line"
                                                    value={country}
                                                    onChange={(val) => setCountry(val)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {/* State */}
                                            <div className="form-group">
                                                <label className="col-sm-12">State/Region</label>
                                                <div className="col-sm-12">
                                                    <RegionDropdown
                                                    classes="form-control form-control-line"
                                                    country={country}
                                                    value={state_of_origin}
                                                    onChange={(val) => setStateOfOrigin(val)} /> 
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* LGA */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                    <label htmlFor="lga" className="col-md-12">Local Government Area or County</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter Local Government Area (LGA) or County" value={lga} onChange={handleChange('lga')} className="form-control form-control-line"/>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>   

                                    {/* Postal Address */}
                                    <div className="form-group">
                                        <label htmlFor="address" className="col-md-12">Permanent Address</label>
                                        <div className="col-md-12">
                                            <textarea type="text" value={postal_address} onChange={handleChange('postal_address')} placeholder="Enter Permanent Address" className="form-control form-control-line"></textarea>
                                        </div>
                                    </div>

                                    <hr/>

                                    {/* Qualification */}
                                    {qualificationData.map((formData, index) => {
                                        return (
                                            <div className="mt-3" key={index}>
                                                {/* Qualification */}
                                            <div className="form-group">
                                                <label className="col-sm-12">Qualification</label>
                                                <div className="col-sm-12">
                                                    <select onChange={(event) => handleQualificationChange(event, index, 'qualification')} className="form-control form-control-line">
                                                        <option value="">Select Qualification</option>
                                                        <option value="B.N.Sc/B.S.N/B.Sc Nursing">B.N.Sc/B.S.N/B.Sc Nursing</option>
                                                        <option value="M.Sc">M.Sc</option>
                                                        <option value="Ph.D">Ph.D</option>
                                                        
                                                    </select>
                                                </div>
                                            </div>

                                            {/* University Attended */}
                                            <div className="form-group">
                                                <label htmlFor="university_attended" className="col-md-12">University Attended</label>
                                                <div className="col-md-12">
                                                    <input value={formData.universityAttended} onChange={(event) => handleQualificationChange(event, index, 'universityAttended')} type="text" placeholder="Enter University" className="form-control form-control-line"/>
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-md-6">

                                                        {/* Year of Entry */}
                                                    <div className="form-group">
                                                        <label htmlFor="year_of_entry" className="col-md-12">Year of Entry</label>
                                                        <div className="col-md-12">
                                                        <input value={formData.yearofEntry} onChange={(event) => handleQualificationChange(event, index, 'yearofEntry')} type="number" placeholder="Enter Year of Entry" className="form-control form-control-line"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                     {/* Year of Graduation */}
                                                    <div className="form-group">
                                                        <label htmlFor="year_of_graduation" className="col-md-12">Year of Graduation</label>
                                                        <div className="col-md-12">
                                                        <input value={formData.yearofGraduation} onChange={(event) => handleQualificationChange(event, index, 'yearofGraduation')} type="number" placeholder="Enter Year of Graduation" className="form-control form-control-line"/>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                     {/* Registration Number */}
                                                    <div className="form-group">
                                                        <label htmlFor="registration_number" className="col-md-12">Registration Number</label>
                                                        <div className="col-md-12">
                                                            <input  value={formData.regNumber} onChange={(event) => handleQualificationChange(event, index, 'regNumber')} type="text" placeholder="Enter Registration Number" className="form-control form-control-line"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                
                                                <button type="button" onClick={() => handleRemoveInputFields(index)} className="btn btn-danger mt-4"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                            

                                            </div>
                                        )
                                    })}
                                     <button type="button" onClick={() => handleAddInputFields()} className="btn btn-secondary mb-5 mt-3">+ Add Qualification</button>

                                     <hr/>
                                    
                                   
                                    <div className="row">
                                         {/* password */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="col-md-6">Password</label>
                                                <div className="col-md-12">
                                                    <input type="password" value={password} onChange={handleChange('password')} placeholder="password" className="form-control form-control-line"/>
                                                </div>
                                        
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="col-md-6">Confirm Password</label>
                                                <div className="col-md-12">
                                                    <input type="password" value={confirmPassword} onChange={handleChange('confirmPassword')} placeholder="confirm password" className="form-control form-control-line"/>
                                                </div>
                                        
                                            </div>
                                        </div>

                                    </div>


                                    {/* Access Token */}
                                    <div className="row">
                                        <div className="col-md-12">
                                        <div className="form-group">
                                                <label className="col-md-6">Access Token</label>
                                                <div className="col-md-12">
                                                    <input type="text" value={accessToken} onChange={handleChange('accessToken')} placeholder="access token" className="form-control form-control-line"/>
                                                    <small>Provide a valid access token</small>
                                                </div>
                                        
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="form-group">
                                       <div className="col-sm-12">
                                            {!Loading? <button type="button" onClick={() => handleSubmit()} className="btn btn-success mt-3">Create Account</button> : 
                                            <button type="button" className="btn btn-success mt-3" disabled>Loading...</button>
                                            }
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                            <p className="text-center">Don't have an access token?
                                <Link to="/create/account"> Create Account</Link>
                            </p>

                            <p className="text-center">Already have an account?
                                <Link to="/login"> Login</Link>
                            </p>
                        </div>
                    </div>
                   
                </div>
               
            </div>
          
            <Footer/>
            </div>
                    

         
       
            </HelmetProvider>
        </React.Fragment>
    )
}

export default RegisterWithToken
