// React
import React from 'react';

// react router dom
import {Route, Switch} from 'react-router-dom'

// Register Page
import Register from './Pages/Register'

// Login Page
import Login from './Pages/Login'

// Admin Login Page
import AdminLogin from './Pages/AdminLogin'

// Dashboard
import Dashboard from './Pages/Dashboard'

// Dashboard Detail
import DashboardDetail from './Pages/DashboardDetail'

// Profile
import Profile from './Pages/Profile'

// Admin User Page
import AdminUser from './Pages/AdminUser'

// PDF Render
import PdfRender from './Pages/PDFRender'

// ID card generator
import IDCardGenerator from './Pages/IDCardGenerator'

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

        {/* Admin Login Page Route */}
        <Route path="/admin/login" exact component={AdminLogin} /> 
      
      
      
       {/* Dashboard Route */}
        <AuthHoc path="/dashboard" exact component={Dashboard} />

        {/* Dashboard Detail Route */}
        <AuthHoc path="/user/:id" exact component={DashboardDetail} />


        {/* Profile Route */}
        <AuthHoc path="/profile" exact component={Profile} />

        {/* Admin User Route */}
        <AuthHoc path="/admin/user" exact component={AdminUser} />

        {/* pdf Render */}
        <AuthHoc path="/pdf/render" exact component={PdfRender} />

         {/* ID Card */}
         <AuthHoc path="/id/generate" exact component={IDCardGenerator} />
       
       

        </Switch>

        
    
    </React.Fragment>
  )
}

export default App;
