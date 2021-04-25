import React, {useEffect, useState, useRef} from 'react'

// import react router dom
import {useLocation, useHistory} from 'react-router-dom'

// react to print
import {useReactToPrint} from 'react-to-print';

// import Dayjs 
import Dayjs from 'dayjs'



// init pdfRender component
const PDFRender = (props) => {

  // init useLocation
  const location = useLocation()

  // init useHistory
  const history = useHistory()

  // init componentRef
  const componentRef = useRef();

  // init useEffect
  useEffect(() => {

     // check if authenticated
     if(!props.authUser) {
      return history.push({pathname: '/login'})
    }


    // check if location
    if (location.state && location.state.data) {

      console.log(location.state.data)

      // update profile image state
      setProfileImage(location.state.data.profile_pic)

      //   update userData State
      setUserData(location.state.data)

      //   update user qualification
      setUserQualification(location.state.data.qualifications)

    } else {
      history.push({pathname: '/dashboard'})
    }
  }, [])

  // init ProfileImage state
  const [ProfileImage,
    setProfileImage] = useState('')

  // init userData state
  const [userData,
    setUserData] = useState({})

  // init userQualification state
  const [userQualification,
    setUserQualification] = useState([])

  // init handlePrint
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <div ref={componentRef}>

      <div className="container-fluid">

        <div className="row">

          <div className="col-lg-12 col-xlg-12 col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="container ml-auto mb-5">
                  <button onClick={() => handlePrint()} className="btn btn-secondary float-right">
                    <i className="mdi mdi-printer-settings"></i>
                    Print</button>
                </div>

                <center className="mt-4">
                  <img
                    style={{
                    margin: "auto",
                    display: 'block'
                  }}
                    src={`https://register.ugonsa.org/${ProfileImage.replace(process.env.REACT_APP_IMAGE_FORMAT, '')}` || '/assets/images/profile.png'}
                    className="rounded-circle"
                    alt="profile"
                    style={{height: "150px", width: "150px", objectFit: "cover", objectPosition: "center"}}
                    />
                  <h4 className="card-title" style={{marginTop: 20}}>{userData.registrationNumber}</h4>
                  <p className="card-title m-t-20">

                    <b>{userData.verification_status}</b>
                  </p>

                </center>

                <div className="container mt-4">
                  <table className="table">
                    <thead>
                        
                      <tr>
                       
                        <th scope="col">Surname</th>
                        <th scope="col"><center>{userData.surname}</center></th>
                       
                      </tr>
                      <tr>
                       
                       <th scope="col">First Name</th>
                       <th scope="col"><center>{userData.firstName}</center></th>
                      
                     </tr>
                     <tr>
                       
                       <th scope="col">Other Name</th>
                       <th scope="col"><center>{userData.otherName || "Nil"}</center></th>
                      
                     </tr>
                     <tr>
                       
                       <th scope="col">Email</th>
                       <th scope="col"><center>{userData.email}</center></th>
                      
                     </tr>
                     <tr>
                       
                       <th scope="col">Phone</th>
                       <th scope="col"><center>{userData.phone}</center></th>
                      
                     </tr>
                     <tr>
                       
                       <th scope="col">Date of Birth</th>
                       <th scope="col"><center>{Dayjs(userData.dob).format('DD/MM/YYYY')}</center></th>
                      
                     </tr>
                     <tr>
                       
                       <th scope="col">Gender</th>
                       <th scope="col"><center>{userData.sex}</center></th>
                      
                     </tr>
                     <tr>
                       
                       <th scope="col">Country</th>
                       <th scope="col"><center>{userData.country}</center></th>
                      
                     </tr>
                     <tr>
                       
                       <th scope="col">State Of Origin</th>
                       <th scope="col"><center>{userData.state_of_origin}</center></th>
                      
                     </tr>
                     <tr>
                       
                       <th scope="col">Local Government Area (LGA)</th>
                       <th scope="col"><center>{userData.lga}</center></th>
                      
                     </tr>
                     <tr>
                       
                       <th scope="col">Permanent Address</th>
                       <th scope="col"><center>{userData.address}</center></th>
                      
                     </tr>
                    </thead>
                    <tbody>
                    {userQualification.map((qualification, index) => {
                    return <React.Fragment key={index}>
                        <tr>
                            <td>Qualification</td>
                            <td><center>{JSON.parse(qualification).qualification}</center></td>
                        </tr>
                        <tr>
                            <td>University Attended</td>
                            <td><center>{JSON.parse(qualification).universityAttended}</center></td>
                        </tr>
                        <tr>
                            <td>Year Of Entry</td>
                            <td><center>{JSON.parse(qualification).yearofEntry}</center></td>
                        </tr>
                        <tr>
                            <td>Year Of Graduation</td>
                            <td><center>{JSON.parse(qualification).yearofGraduation}</center></td>
                        </tr>
                        <tr>
                            <td>Registration Number</td>
                            <td><center>{JSON.parse(qualification).regNumber}</center></td>
                        </tr>
                    </React.Fragment>
                        })}

                    </tbody>
                    </table>
                     
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PDFRender
