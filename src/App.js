// React
import React from 'react';

// react router dom
import {Route, Switch} from 'react-router-dom'

// Register Page
import Register from './Pages/Register'

// Login Page
import Login from './Pages/Login'

// Dashboard
import Dashboard from './Pages/Dashboard'

// Dashboard Detail
import DashboardDetail from './Pages/DashboardDetail'

// Profile
import Profile from './Pages/Profile'

// import AuthHOC
import AuthHoc from './Hoc/AuthHoc'





const App = () => {
  return (
    <React.Fragment>
      

        <Switch>
        
        
       {/* New Registration Route */}
       <Route path="/register/new" exact component={Register} />

       {/* Login Page Route */}
       <Route path="/login" exact component={Login} /> 
      
      
      
       {/* Dashboard Route */}
        <AuthHoc path="/dashboard" exact component={Dashboard} />

        {/* Dashboard Detail Route */}
        <AuthHoc path="/user/:id" exact component={DashboardDetail} />


        {/* Profile Route */}
        <AuthHoc path="/profile" exact component={Profile} />
       
       

        </Switch>

        
    
    </React.Fragment>
  )
}

export default App;
