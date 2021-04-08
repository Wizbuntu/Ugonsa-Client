import React from 'react'

// react router dom
import {Link, useHistory} from 'react-router-dom'

// import jscookie
import cookieJs from 'js-cookie'

// init Sidebar component
const Sidebar = (props) => {

  // init useHistory
  const history = useHistory()

  // init handleLogout
  const handleLogout = () => {

    // delete token
    cookieJs.remove('ugonsaToken')

    // redirect to login
    return history.push({pathname: '/login'})

  }

  return (
    <React.Fragment>

      <aside className="left-sidebar mt-5" data-sidebarbg="skin5">

        <div className="scroll-sidebar">

          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              {props.authUser && props.authUser.admin
                ? <React.Fragment>
                    <li className="sidebar-item">
                      <Link
                        className="sidebar-link waves-effect waves-dark sidebar-link"
                        style={{
                        background: "none"
                      }}
                        to="/dashboard">
                        <i className="mdi mdi-av-timer"></i>
                        <span className="hide-menu">Dashboard</span>
                      </Link>
                    </li>

                    <li className="sidebar-item">
                      <Link
                        className="sidebar-link waves-effect waves-dark sidebar-link"
                        to="/admin/user">
                        <i className="mdi mdi-account"></i>
                        <span className="hide-menu">Admin Users</span>
                      </Link>
                    </li>
                  </React.Fragment>
                : <li className="sidebar-item">
                  <Link
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    to="/profile">
                    <i className="mdi mdi-account-network"></i>
                    <span className="hide-menu">Profile</span>
                  </Link>
                </li>
}

              <li className="sidebar-item">
                <div
                  className="sidebar-link waves-effect waves-dark sidebar-link"
                  style={{
                  cursor: 'pointer'
                }}
                  onClick={() => handleLogout()}>
                  <i className="mdi mdi-logout"></i>
                  <span className="hide-menu">Logout</span>
                </div>
              </li>

            </ul>
          </nav>

        </div>

      </aside>

    </React.Fragment>
  )
}

// export sidebar
export default Sidebar
