import React from 'react'

// react router dom
import {Link} from 'react-router-dom'

// import css
import '../Util/Home.css'

// Footer
import Footer from '../Components/Footer'


// init Home Page
const Home = () => {
  return (
    <React.Fragment>
      <div className="container h-100">
          <div className="container">
              <img alt="ugonsa-logo" src="https://register.ugonsa.org/assets/images/ugonsa_logo.png" className="img-fluid mt-5 mb-4 home-logo-image"/>
          </div>
        <div className="row">

          <div className="col-lg-6">
          <div className="card">
              <div className="card-body p-5 home-card-box-shadow">
              
                <div className="d-flex align-items-center flex-row m-t-30">
                  <div className="display-6 mb-2">
                   
                    <span>New Member</span>
                   
                  </div>
                  
                </div>
                <p className="home-text-desc">Are you a new member?</p>
                <p className="home-text-desc">Click the button below to create an account. You will be required to pay a registration fee of <b>&#8358; 2050</b> during the registration process.
                </p>
                
                <Link to="/register/new" className="btn btn-success btn-lg">Proceed</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-body p-5 home-card-box-shadow">
              
                <div className="d-flex align-items-center flex-row m-t-30">
                  <div className="display-6 mb-2">
                   
                    <span>Existing Member</span>
                   
                  </div>
                </div>
                <p className="home-text-desc">Already a member of UGONSA?</p>
                <p className="home-text-desc">Click the button below to create an account and upload a scanned image of your <b>UGONSA ID CARD</b> for verification.
                </p>
                
                <Link to="/register/old" className="btn btn-primary btn-lg">Proceed</Link>
              </div>
            </div>

          </div>
          <div  className=" container mt-3 text-center mb-5">
          <h5>Already Registered? <Link to="/login" className="text-primary">Login</Link></h5>
          <h5><a href="https://ugonsa.org" target="_blank" className="text-primary">Go to website</a></h5>
          </div>
         
        </div>
      </div>

      <Footer/>
    </React.Fragment>
  )
}

// export Home Page
export default Home
