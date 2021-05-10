// React
import React, {useEffect} from 'react';

// loadjs
import loadjs from 'loadjs'


// react router dom
import {BrowserRouter, Route, Switch} from 'react-router-dom'

// Register Page
import Register from './Pages/Register'

// Register With Token
import RegisterWithToken from './Pages/RegisterWithToken'

// create Account 
import CreateAccount from './Pages/CreateAccount'

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

// import NotFound component
import NotFound from './Pages/NotFound'

// import ForgotPassword Component
import ForgotPassword from './Pages/ForgotPassword'

// import PasswordReset component
import PasswordReset from './Pages/PasswordReset'

// import AccessToken component 
import AccessToken from './Pages/AccessTokens'





const App = () => {
  return (
    <BrowserRouter>
    <div>
        <Switch>
        
         {/* Login Page Route */}
        <Route path="/login" component={Login} /> 
        
         {/* Admin Login Page Route */}
         <Route exact path="/admin/login" component={AdminLogin} /> 

        {/* forgot password route */}
        <Route exact path="/forgot/password" component={ForgotPassword} /> 

        {/* password reset route */}
        <Route exact path="/user/password/reset/:token" component={PasswordReset} /> 

       {/* New Registration Route */}
       <Route exact path="/user/register/:token" component={Register} />

        {/* Create Account  Route */}
        <Route exact path="/create/account" component={CreateAccount} />

        {/* Register with token */}
        <Route exact path="/token/register"  component={RegisterWithToken} />

       
{/*========================= PROTECTED ROUTES ==============================================  */}
       {/* Dashboard Route */}
        <AuthHoc exact path="/dashboard"  component={Dashboard} />

        {/* Dashboard Detail Route */}
        <AuthHoc exact path="/user/:id"  component={DashboardDetail} />


        {/* Profile Route */}
        <AuthHoc exact path="/profile" component={Profile} />

        {/* Admin User Route */}
        <AuthHoc exact path="/admin/user" component={AdminUser} />

         {/* Access token route */}
         <AuthHoc exact path="/admin/access/token" component={AccessToken} />

       
        {/* pdf Render */}
        <AuthHoc exact path="/pdf/render" component={PdfRender} />

         {/* ID Card */}
         <AuthHoc exact path="/id/generate" component={IDCardGenerator} />

         {/* Home Page Route */}
        <Route exact path="/" component={Login} /> 

        {/* 404 page */}
        <Route path="*" component={NotFound} />
       
        </Switch>

        
    
    </div>
    </BrowserRouter>
  )
}

export default App;
