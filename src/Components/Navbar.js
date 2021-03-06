import React, {useEffect, useState} from 'react'

// react router dom
import {useHistory} from 'react-router-dom'

// import jscookie
import cookieJs from 'js-cookie'



// init Navbar component
const Navbar = (props) => {


  // init useHistory
  const history = useHistory()

  // init useEffect 
  useEffect(() => {
    // check if props
    if(props.authUser && props.authUser.profilePic) {
      // update userProfilePic state
      setUserProfilePic(props.authUser.profilePic)
    }
  }, [props])

  // init userProfilePic state
  const [userProfilePic, setUserProfilePic] = useState("")

  // init handleLogout 
  const handleLogout = () => {

    // delete token
    cookieJs.remove('ugonsaToken')

    // redirect to login
    return history.push({pathname: '/login'})


  }


  return (
    <React.Fragment>
      
      <header className="topbar" data-navbarbg="skin6">
        <nav className="navbar top-navbar navbar-expand-md navbar-light">
          <div className="navbar-header" data-logobg="skin5">

            <a
              className="nav-toggler waves-effect waves-light d-block d-md-none"
             >
              <i className="ti-menu ti-close"></i>
            </a>

            <div className="navbar-brand">
              <a href="index.html" className="logo mt-3">
              <b className="logo-icon mr-3">
                              
                <img src="https://register.ugonsa.org/assets/images/ugonsa_logo_small.png" style={{width: 60, height: 70}} alt="homepage" className="dark-logo" />
                              
                <img src="https://register.ugonsa.org/assets/images/ugonsa_logo_small.png" style={{width: 60, height: 70}} alt="homepage" className="light-logo" />
                </b>
                <span className="logo-text">
                   <b style={{color: "#fff"}}>UGONSA</b>
                </span>
              </a>
            </div>

            <a
              className="topbartoggler d-block d-md-none waves-effect waves-light"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <i className="ti-more"></i>
            </a>
          </div>

          <div
            className="navbar-collapse collapse"
            id="navbarSupportedContent"
            data-navbarbg="skin6">

            

            <ul className="navbar-nav float-right ml-auto">

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
        
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                    {props.authUser && props.authUser.admin ?
                      <img src={`${props.authUser && props.authUser.profilePic ? props.authUser.profilePic : '/assets/images/profile.png'}`}   alt="user"
                      className="rounded-circle"
                      style={{height: "40px", width: "40px", objectFit: "cover"}}/> :
                      <img src={`https://register.ugonsa.org/${userProfilePic.replace(process.env.REACT_APP_IMAGE_FORMAT, '')}` || '/assets/images/profile.png'} alt="user" className="rounded-circle"  style={{height: "40px", width: "40px", objectFit: "cover"}}/>
                    }
                  
                </a>
                <div className="dropdown-menu dropdown-menu-right user-dd animated">
                  <div onClick={() => handleLogout()} className="dropdown-item" style={{cursor: "pointer"}}>
                  <i className="fa fa-sign-out mr-3" aria-hidden="true"></i>
                    Logout</div>
                  
                </div>
              </li>

            </ul>
          </div>
        </nav>
      </header>

    </React.Fragment>
  )
}

export default Navbar
