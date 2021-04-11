import React, {useRef, useEffect, useState} from 'react'

// import id card styles
import '../styles/pdfGen.css'

// react to print
import {useReactToPrint} from 'react-to-print';

// import React router dom
import {useLocation, useHistory} from 'react-router-dom'




// init IDCard Generator component
const IDCardGenerator = (props) => {

  // init componentRef
  const componentRef = useRef();

  //   init useLocation
  const location = useLocation()

  //   init useHistory
  const history = useHistory()


  //   init useEffect
  useEffect(() => {

     // check if authenticated
     if(!props.authUser) {
      return history.push({pathname: '/login'})
    }

    // check if location
    if (location.state && location.state.data) {
    //  update userData state
    setUserData(location.state.data)

    // update profileImage state
    setProfileImage(location.state.data.profile_pic)

    // update userQualification state
    setUserQualification(location.state? location.state.data.qualifications : [])

    } else {
        history.push({pathname: '/dashboard'})
    }

  }, [props])

  // init Profile image state
  const [profileImage, setProfileImage] = useState("")

  // init userData state
  const [userData, setUserData] = useState({})


  // init userQualification state
  const [userQualification, setUserQualification] = useState([])



  // init handlePrint
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <React.Fragment>
    <div className="container">
      <button
        onClick={() => handlePrint()}
        className="btn btn-secondary float-right m-2 mt-5 mb-4 print-button">
        <i className="mdi mdi-printer-settings"></i>
        Print ID Card</button> 
        
       
      <div className="schLogo">
        <img className="img-fluid" src="/assets/images/pics-logo.png" alt="school-logo"/>
      </div>
      <div>
        <div className="idcontainer" ref={componentRef}>

          <div className="id-box">
            <div className="left-side">
              <h1>Membership Identity Card</h1>
              <h5 className="text-white">{userData.registrationNumber}</h5>
              <div className="image-layer">
                <img src={`http://localhost:4001/${profileImage.replace(process.env.REACT_APP_IMAGE_FORMAT, '')}` || '/assets/images/profile.png'} alt=""/>
              </div>
              <div className="text">
                <p>
                  <span>Name:</span><br/>
                  <strong>
                    {`${userData.surname} ${userData.firstName}`}</strong><br/>
                  <span>State of Origin:</span><br/>
                  <strong>
                    {userData.state_of_origin}</strong><br/>

                  <span>Local Government Area:</span><br/>
                  <strong>
                    {userData.lga}</strong><br/>

                  <span>Phone:</span><br/>
                  <strong>
                    {userData.phone}</strong><br/>
                    <span>Email:</span><br/>
                  <strong>
                    {userData.email}</strong><br/>
                </p>
              </div>
            </div>

            <div className="right-side">
              <div className="background-image">
                <img src="/assets/images/coat.png" alt="image"/>
              </div>
              <div className="designLogo">
                <div className="flag">
                  <div className="color1"></div>
                  <div className="color2"></div>
                  <div className="color3"></div>
                </div>
              </div>

              <div className="header">
                <h1>UGONSA</h1>

                <div className="logo">
                  <img src="/assets/images/coat.png" alt=""/>
                </div>
              </div>

              <div className="context1">
                <p className="email" style={{marginBottom: 0}}>
                  <span style={{
                    color: "red",
                  }}>E-mail: 
                  </span>
                  gnan2ugonsa@gmail.com</p>
                  <p className="email">
                  <span style={{
                    color: "red"
                  }}>Website:
                   </span>
                    www.ugonsa.org</p>
                <h4
                  className="ml-5"
                  style={{
                  lineHeight: 1.6,
                  marginTop: 10
                }}>
                  <b>University Graduates of Nursing Association (UGONSA)</b>
                </h4>

                <i className="motto">Slogan: Make a positive change</i>
                <p className="aka">a.k.a</p>
                <h3 style={{
                  lineHeight: 1.1
                }}>Graduate Nurses Association of Nigeria (GNAN)</h3>
                <h2 className="vague">{userData.registrationNumber}</h2>
              </div>
              <hr/>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div className="container">
          <div className="mobile-display text-center">
            <img src="/assets/images/mobile.svg" className="img-fluid" style={{height: 200}} />
          <h3 className="text-center text-secondary mt-4 mb-5"><b>ID Card not visible on mobile</b></h3>
        </div>

          </div>

  </React.Fragment>
  )
}

export default IDCardGenerator
