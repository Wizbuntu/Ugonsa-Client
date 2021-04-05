import React, {useRef, useEffect} from 'react'

// import id card styles
import '../styles/pdfGen.css'

// react to print
import {useReactToPrint} from 'react-to-print';

// import React router dom
import {useLocation, useHistory} from 'react-router-dom'

// init IDCard Generator component
const IDCardGenerator = () => {

  // init componentRef
  const componentRef = useRef();

  //   init useLocation
  const location = useLocation()

  //   init useHistory
  const history = useHistory()

  //   init useEffect
  useEffect(() => {

    // check if location
    if (location.state && location.state.data) {
      return console.log(location.state.data)
    } else {
        history.push({pathname: '/dashboard'})
    }

  }, [])

  // init handlePrint
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (

    <div className="container">
      <button
        onClick={() => handlePrint()}
        className="btn btn-secondary float-right m-2">
        <i className="mdi mdi-printer-settings"></i>
        Print ID Card</button>
      <div className="schLogo">
        <img className="img-fluid" src="/assets/images/pics-logo.png" alt=""/>
      </div>
      <div style={{}}>
        <div className="idcontainer" ref={componentRef}>

          <div className="id-box">
            <div className="left-side">
              <h1>Membership Identity Card</h1>
              <h5 className="text-white">UGONSA/ID/NAT/0547</h5>
              <div className="image-layer">
                <img src="/assets/images/users/2.jpg" alt=""/>
              </div>
              <div className="text">
                <p>
                  <span>Name:</span><br/>
                  <strong>
                    ABDUL-QADIR HAMMAWA GAMBO</strong><br/>
                  <span>State of Origin:</span><br/>
                  <strong>
                    IMO</strong><br/>

                  <span>Local Government Area:</span><br/>
                  <strong>
                    Aboh Mbaise</strong><br/>

                  <span>Contact:</span><br/>
                  <strong>
                    07031312190</strong><br/>
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
                <p className="email">
                  <span style={{
                    color: "red"
                  }}>E-mail:
                  </span>
                  gnan2ugonsa@gmail.com</p>
                <h4
                  className="ml-5"
                  style={{
                  lineHeight: 1.6
                }}>
                  <b>University Graduates of Nursing Association (UGONSA)</b>
                </h4>

                <i className="motto">Motto: Make a positive change</i>
                <p className="aka">a.k.a</p>
                <h3 style={{
                  lineHeight: 1.1
                }}>Graduate Nurses Association of Nigeria (GNAN)</h3>
                <h2 className="vague">UGONSA/ID/NAT/024</h2>
              </div>
              <hr/>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default IDCardGenerator
