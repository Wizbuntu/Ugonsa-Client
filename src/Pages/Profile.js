import React, {useState, useEffect} from 'react'

// import axios
import axios from '../Util/axiosConfig'

// import react loading skeleton
import Skeleton from 'react-loading-skeleton';

// import React-router-dom
import {useHistory} from 'react-router-dom'

// import Dayjs
import Dayjs from 'dayjs'

// import react Helmet
import { Helmet, HelmetProvider } from 'react-helmet-async';

// import react hot toast
import toast, {Toaster} from 'react-hot-toast';





// init Profile component
const Profile = (props) => {

    // init useHistory
    const history = useHistory()

  // init userProfile pic state
  const [userProfilePic,
    setUserProfilePic] = useState("")

  // init userQualifications state
  const [userQualifications,
    setUserQualifications] = useState([])

  // init Loading state
  const [Loading,
    setLoading] = useState(true)

  // init updateDegreeLoading
  const [updateDegreeLoading, setUpdateDegreeLoading] = useState(false)

  // init useEffect
  useEffect(() => {
    // check if user id in props authUser
    if (props.authUser && props.authUser.id) {
      axios
        .get(`/v1/api//user/${props.authUser.id}`)
        .then(({data}) => {
          // update Loading state to false
          setLoading(false)

          // check if success
          if (!data.success) {
            return console.log(data)
          }
          console.log(data.data)
          // update userData state
          setUserData(data.data)
          setUserProfilePic(data.data.profile_pic)
          setUserQualifications(data.data.qualifications || [])

        })
        .catch((error) => {
          console.log(error)
        })

    }

  }, [props])

  // init userData state
  const [userData,
    setUserData] = useState({})

  // init renderPdf function
  const renderPdf = () => {
    return history.push({
      pathname: '/pdf/render',
      state: {
        data: userData
      }
    })
  }

  // init renderIdCard
  const renderIdCard = () => {
    return history.push({
      pathname: '/id/generate',
      state: {
        data: userData
      }
    })
  }



  // init openUploadWidget
  const openUploadWidget = () => {
    window
      .cloudinary
      .openUploadWidget({
        cloud_name: 'ugonsa',
        upload_preset: 'rnaamhf3'
      }, (error, result) => {
        // check if error
        if (error) {
          return console.log(error)
          
        }
        // update UpdateDegreeLoading
        setUpdateDegreeLoading(true)

        // get profileUpdateData
        const profileUpdateData = {
          user_id: userData.uid,
          email: userData.email,
          degree_certificate: result[0].secure_url
        }


        // axios request to update certificate
        axios.post('/v1/api/update/user/certificate', profileUpdateData)
        .then(({data}) => {
          // update UpdateDegreeLoading
          setUpdateDegreeLoading(false)
            // if not success
            if(!data.success) {
              return toast.error(data.data)
            }

            // return success toast
            return toast.success(data.data)
        })
        .catch((error) => {
          // update UpdateDegreeLoading
          setUpdateDegreeLoading(false)

          console.log(error)
          return toast.error("Oops! An error has occured")
        })


      })
  }

  return (
    <React.Fragment>
         <HelmetProvider>
          
            <Helmet>
              
              <title>Profile - Ugonsa</title>
             
            </Helmet>

            <Toaster/>
         

      <div className="container-fluid">

        <div className="row">

          <div className="col-lg-4 col-xlg-3 col-md-5">
            {!Loading?  
            <React.Fragment>
            <div className="card">
              <div className="card-body">
                <center className="m-t-30">
                  <img
                    src={`https://register.ugonsa.org/${userProfilePic.replace(process.env.REACT_APP_IMAGE_FORMAT, '')}` || '/assets/images/profile.png'}
                    className="rounded-circle"
                    alt="profile-pic"
                    style={{height: "150px", width: "150px", objectFit: "cover", objectPosition: "center"}}
                    />
                  <h4 className="card-title m-t-10">{userData.surname} {userData.firstName}</h4>
                  <div className="row text-center justify-content-md-center" style={{margin: "auto", display: 'block'}}>
                        {userData.verification_status === "pending"
                          ? <div><span className="label label-warning label-rounded">pending</span>
                            <p className="mt-3 text-secondary">Registered but awaiting verification</p>
                          </div>
                          : userData.verification_status === "verified"
                            ? <div><span className="label label-success label-rounded text-center">verified</span> 
                              <p className="mt-3 text-secondary">Fully Registered</p>
                            </div>
                            : userData.verification_status === "unverified"
                              ? <div><span className="label label-danger label-rounded">unverified</span> 
                                <p className="mt-3 text-secondary">Not yet a Registered Member</p>
                              </div> 
                              : userData.verification_status === "suspended" ? 
                              <span className="label label-megna label-rounded">suspended</span> :
                              userData.verification_status === "inactive" ? 
                              <span className="label label-inverse label-rounded">inactive</span> :
                              userData.verification_status === "deregistered" ? 
                              <span className="label label-primary label-rounded">deregistered</span> :
                              
                              <span className="label label-default label-rounded">loading...</span>
                      }

                      </div>

                  <div className="row text-center justify-content-md-center mt-4">
                  {userData.verification_status === "verified" && <React.Fragment>
                    <div className="col-md-12">
                    <button onClick={() => renderIdCard()} className="btn btn-secondary mt-3 btn-block">
                    <i className="mdi mdi-download"></i>
                    Generate ID Card
                  </button>
                    </div>
                    </React.Fragment>
                    }
                  </div>
                </center>
              </div>
              <div>
              </div>
             
            </div>
            {/* Upload degree certificate */}
            {!userData.nursingCertificate ?  <div className="card">
              <div className="card-body">
                    <button onClick={() => openUploadWidget()} className="btn btn-outline-secondary btn-block btn-lg">Upload Degree Certificate</button>
                    {updateDegreeLoading && <p>Uploading certificate...</p>}
                    
              </div>
              </div> : 
               <div className="card">
               <div className="card-body">
                     <a href={`${userData.nursingCertificate}`} target="_blank" className="btn btn-outline-secondary btn-block btn-lg">View Degree Certificate</a>
                    
               </div>
               </div>
              }
           
            </React.Fragment>
            : <div className="card">
            <div className="card-body text-center justify-content-md-center">
              <center className="m-t-30 m-b-30">
                <Skeleton count={5}/>
              </center>
            </div>
          </div>}
          </div>

          <div className="col-lg-8 col-xlg-9 col-md-7">
          {!Loading
              ? <div className="card">
                  <div className="card-body">
                    <form className="form-horizontal form-material">
                      <div className="row">
                        <div className="col-md-4">
                            {/* Surname */}
                            <div className="form-group">
                              <label className="col-md-12">Surname</label>
                              <div className="col-md-12">
                                <input
                                  type="text"
                                  value={userData.surname}
                                  className="form-control form-control-line"
                                  readOnly/>
                              </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            {/* First Name */}
                            <div className="form-group">
                              <label className="col-md-12">First Name</label>
                              <div className="col-md-12">
                                <input
                                  type="text"
                                  value={userData.firstName}
                                  className="form-control form-control-line"
                                  readOnly/>
                              </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            {/* OtherName */}
                            <div className="form-group">
                              <label className="col-md-12">Other Name</label>
                              <div className="col-md-12">
                                <input
                                  type="text"
                                  value={userData.otherName}
                                  className="form-control form-control-line"
                                  readOnly/>
                              </div>
                            </div>
                        </div>
                      </div>
                      
                      {/* Registration Number */}
                      <div className="form-group">
                        <label className="col-md-12">Registration Number</label>
                        <div className="col-md-12">
                          <input
                            type="text"
                            value={userData.registrationNumber}
                            className="form-control form-control-line"
                            readOnly/>
                        </div>
                      </div>

                      <div className="row">
                        {/* email */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email</label>

                            <input
                              type="email"
                              value={userData.email}
                              className="form-control form-control-line"
                              name="example-email"
                              id="example-email"
                              readOnly/>

                          </div>
                        </div>
                        {/* phone */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Phone</label>

                            <input
                              type="phone"
                              value={userData.phone}
                              className="form-control form-control-line"
                              readOnly/>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* DOB */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Date of Birth</label>

                            <input
                              type="text"
                              value={Dayjs(userData.dob).format('DD/MM/YYYY')}
                              className="form-control form-control-line"
                              readOnly/>

                          </div>
                        </div>
                        

                        {/* Sex */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Gender</label>
                            <input
                              type="text"
                              value={userData.sex}
                              className="form-control form-control-line"
                              readOnly/>
                          </div>
                        </div>
                      </div>

                      {/* Country */}
                        <div className="form-group">
                              <label>Country</label>

                              <input
                                type="text"
                                value={userData.country}
                                className="form-control form-control-line"
                                readOnly/>

                        </div>

                      <div className="row">
                        {/* State of Origin */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>State of Origin</label>

                            <input
                              type="text"
                              value={userData.state_of_origin}
                              className="form-control form-control-line"
                              readOnly/>

                          </div>
                        </div>
                        {/* Local Government Area */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Local Government Area</label>
                            <input
                              type="text"
                              value={userData.lga}
                              className="form-control form-control-line"
                              readOnly/>
                          </div>
                        </div>

                      </div>

                      {/* Postal Address */}
                      <div className="form-group">
                        <label className="col-md-12">Permanent Address</label>
                        <div className="col-md-12">
                          <textarea
                            type="text"
                            value={userData.address}
                            className="form-control form-control-line"
                            readOnly></textarea>
                        </div>
                      </div>
                      <hr/>
                     
                      {userQualifications.map((qual, index) => {

                      return <div key={index} className="mt-3">
                           <div className="form-group">
                         <div className="col-md-12">Qualification</div>
                         <div className="col-md-12">
                         <input
                              type="text"
                              value={JSON.parse(qual).qualification}
                              className="form-control form-control-line"
                              readOnly/>
                         </div>
                       </div>

                       <div className="form-group">
                         <div className="col-md-12">University Attended</div>
                         <div className="col-md-12">
                         <input
                              type="text"
                              value={JSON.parse(qual).universityAttended}
                              className="form-control form-control-line"
                              readOnly/>
                         </div>
                       </div>

                       <div className="form-group">
                         <div className="col-md-12">Registration Number</div>
                         <div className="col-md-12">
                         <input
                              type="text"
                              value={JSON.parse(qual).regNumber}
                              className="form-control form-control-line"
                              readOnly/>
                         </div>
                       </div>

                       <div className="row">
                         <div className="col-md-6">
                            <div className="form-group">
                            <div className="col-md-12">Year of Entry</div>
                            <div className="col-md-12">
                            <input
                                  type="number"
                                  value={JSON.parse(qual).yearofEntry}
                                  className="form-control form-control-line"
                                  readOnly/>
                            </div>
                          </div>
                         </div>

                         <div className="col-md-6">
                            <div className="form-group">
                            <div className="col-md-12">Year of Graduation</div>
                            <div className="col-md-12">
                            <input
                                  type="text"
                                  value={JSON.parse(qual).yearofGraduation}
                                  className="form-control form-control-line"
                                  readOnly/>
                            </div>
                          </div>
                         </div>
                       </div>
                      </div>
                      })}

                    

                      <div className="form-group">
                        <div className="col-sm-12">
                          <button onClick={() => renderPdf()} className="btn btn-primary">
                            <i className="mdi mdi-printer-settings"></i> 
                             Print Preview</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              : <div className="card">
                <div className="card-body text-center justify-content-md-center">
                  <center className="m-t-30 m-b-30">
                    <Skeleton
                      count={15}
                      style={{
                      marginTop: "16px"
                    }}/>
                  </center>
                </div>
              </div>
}
          </div>

        </div>

      </div>
      </HelmetProvider>
    </React.Fragment>
  )
}

// export Profile
export default Profile
