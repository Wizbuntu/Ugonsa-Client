import React, {useState} from 'react'

// import UploadUtil
import UploadUtil from '../Util/uploadUtil'

// import react date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import Nigeria state local government
import NaijaStates from 'naija-state-local-government';

// import react hot toast
import toast, { Toaster } from 'react-hot-toast';

// react router dom
import {Link} from 'react-router-dom'

// paystack payment module
import { usePaystackPayment } from 'react-paystack';

// import registerValidation 
import {registerValidation} from '../Util/Validations'



// init Register Page
const Register = () => {

    // init dateOfBirth
    const [dateofBirth, setDateOfBirth] = useState(new Date());

    // init registration state
    const [registrationData, setRegistrationData] = useState({
        fullName: "",
        email: "",
        phone: "",
        profile_pic: "",
        age: "",
        sex: "",
        state_of_origin: "",
        lga: "",
        postal_address: "",
        password: ""

    })

    // init qualificationData state
    const [qualificationData, setQualificationData] = useState([{
        qualification: "",
        universityAttended: "",
        yearofEntry: "",
        yearofGraduation: "",
        regNumber: ""
    }])

    // destructure registrationData
    const {fullName, email, phone, profile_pic, age, sex, state_of_origin, lga, postal_address, password } = registrationData
    
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
        // get RegisterData
        const registerData = {
            fullName: fullName,
            email: email,
            phone: phone,
            profile_pic: profile_pic,
            age: age,
            sex: sex,
            state_of_origin: state_of_origin,
            lga: lga,
            postal_address: postal_address,
            password: password,
            date_of_birth: dateofBirth,
            qualificationData: qualificationData
        }

        // validate registerData
        const error = registerValidation(registerData)

        // check if error
        if(error) {
            return toast.error(error)
        }

        console.log(registerData)
    }


    return (
        <React.Fragment>

            <Toaster/>
            <div className="page-container" style={{backgroundColor: "#efefef"}}>
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-sm-12 col-md-12 align-self-center">
                        <img width="150" height="150" className="img-fluid" style={{margin: "auto", display: "block"}} src="/assets/images/ugonsa_logo.png"/>

                        <h2 className="page-title text-center">Create an Account</h2>
                        <h5 className="text-center mt-4">Please fill the form below to register</h5>
                        <p className="text-center mt-2">Note: You are advised to create an account with a valid email address because all vital information will be sent to the email you supplied.</p>
                    </div>
                    
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
                    </div>
                   
                    <div className="col-lg-8 col-xlg-9 col-md-7">
                        <div className="card rounded shadow-sm bg-white">
                            <div className="card-body">
                                <form className="form-horizontal form-material">

                                    {/* Full Name */}
                                    <div className="form-group">
                                        <label className="col-md-12">Full Name</label>
                                        <div className="col-md-12">
                                            <input type="text" placeholder="Enter Full Name" value={fullName} onChange={handleChange('fullName')} className="form-control form-control-line"/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Email */}
                                            <div className="form-group">
                                                <label htmlFor="email" className="col-md-12">Email</label>
                                                <div className="col-md-12">
                                                    <input type="email" placeholder="Enter Email" value={email} onChange={handleChange('email')}  className="form-control form-control-line"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                                {/* Phone */}
                                                <div className="form-group">
                                                    <label htmlFor="phone" className="col-md-12">Phone Number</label>
                                                    <div className="col-md-12">
                                                        <input type="number" placeholder="Enter Phone Number" value={phone} onChange={handleChange('phone')} className="form-control form-control-line"/>
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
                                        <div className="col-md-6">
                                            {/* Age */}
                                            <div className="form-group">
                                                <label htmlFor="age" className="col-md-12">Age</label>
                                                <div className="col-md-12">
                                                    <input type="number" placeholder="Enter Age" value={age} onChange={handleChange('age')} className="form-control form-control-line"/>
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
                                            {/* State of origin */}
                                            <div className="form-group">
                                                <label className="col-sm-12">State of Origin</label>
                                                <div className="col-sm-12">
                                                    <select onChange={handleChange('state_of_origin')} className="form-control form-control-line">
                                                        <option value="">Select State of Origin</option>
                                                        {NaijaStates.states().map((state, index) => {
                                                            return (
                                                                <option key={index} value={state}>{state}</option>
                                                            )
                                                        })}
                                                        
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {/* Lga */}
                                            <div className="form-group">
                                                <label className="col-sm-12">Local Government Area (LGA)</label>
                                                <div className="col-sm-12">
                                                    <select onChange={handleChange('lga')} className="form-control form-control-line">
                                                        <option value="">Select Lga</option>
                                                        {state_of_origin && NaijaStates.lgas(state_of_origin).lgas.map((_lga, index) => {
                                                            return (
                                                                <option key={index} value={_lga}>{_lga}</option>
                                                            )
                                                        })}
                                                        
                                                        
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    

                                     

                                    {/* Postal Address */}
                                    <div className="form-group">
                                        <label htmlFor="address" className="col-md-12">Postal Address</label>
                                        <div className="col-md-12">
                                            <textarea type="text" value={postal_address} onChange={handleChange('postal_address')} placeholder="Enter Postal Address" className="form-control form-control-line"></textarea>
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
                                                        <option value="B.N.Sc/B.Sc Nursing">B.N.Sc/B.Sc Nursing</option>
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
                                    
                                    {/* password */}
                                    <div className="form-group">
                                        <label className="col-md-12">Password</label>
                                        <div className="col-md-12">
                                            <input type="password" value={password} onChange={handleChange('password')} placeholder="Enter Password" className="form-control form-control-line" />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <button type="button" onClick={() => handleSubmit()} className="btn btn-success mt-3">Register</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <p className="text-center">Already have an account?
                                <Link to="/login"> Login</Link>
                            </p>
                        </div>
                    </div>
                   
                </div>
               
            </div>
          
            <footer className="footer text-center">
                All Rights Reserved by UGONSA. Designed and Developed by
                <a href="https://idealab.com.ng/"> IdeaLab</a>.
            </footer>
            </div>
       
            
        </React.Fragment>
    )
}

export default Register