// React
import React from 'react';

// react router dom
import {BrowserRouter, Route, Switch} from 'react-router-dom'

// Register Page
import Register from './Pages/Register'

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

// import AccessTokenValidate component 
import AccessTokenValidate from './Pages/AccessTokenValidate'





const App = () => {
  return (
    <BrowserRouter>
    <div>
        <Switch>
        
        {/* Home Page Route */}
        <Route exact path="/" component={Login} /> 

         {/* Login Page Route */}
        <Route path="/login" exact component={Login} /> 
        
         {/* Admin Login Page Route */}
         <Route path="/admin/login" exact component={AdminLogin} /> 

        {/* forgot password route */}
        <Route path="/forgot/password" exact component={ForgotPassword} /> 

        {/* password reset route */}
        <Route path="/user/password/reset/:token" exact component={PasswordReset} /> 

       {/* New Registration Route */}
       <Route path="/user/register/:token" exact component={Register} />

        {/* Create Account  Route */}
        <Route path="/create/account" exact component={CreateAccount} />

        {/* Access token validate route */}
        <Route path="/access/token/validate" exact component={AccessTokenValidate} />

{/*========================= PROTECTED ROUTES ==============================================  */}
       {/* Dashboard Route */}
        <AuthHoc path="/dashboard" exact component={Dashboard} />

        {/* Dashboard Detail Route */}
        <AuthHoc path="/user/:id" exact component={DashboardDetail} />


        {/* Profile Route */}
        <AuthHoc path="/profile" exact component={Profile} />

        {/* Admin User Route */}
        <AuthHoc path="/admin/user" exact component={AdminUser} />

         {/* Access token route */}
         <AuthHoc path="/admin/access/token" exact component={AccessToken} />

       
        {/* pdf Render */}
        <AuthHoc path="/pdf/render" exact component={PdfRender} />

         {/* ID Card */}
         <AuthHoc path="/id/generate" exact component={IDCardGenerator} />
       
        </Switch>

        
    
    </div>
    </BrowserRouter>
  )
}

export default App;
