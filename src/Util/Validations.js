//Validator
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone'
import equals from 'validator/lib/equals'



// init registerValidation function
export const registerValidation = (registerData) => {

    // validate firstName
    if (!registerData.firstName) {
        return "Please enter first name"
    }
    // validate surname
    if (!registerData.surname) {
        return "Please enter surname"
    }

    // validate email
    if (!registerData.email) {
        return "Please enter email"
    }
    if (!isEmail(registerData.email)) {
        return "Please enter a valid email"
    }


    // validate phone
    if (!registerData.phone) {
        return "Please enter Phone Number"
    }
    if (!isMobilePhone(registerData.phone)) {
        return "Please enter valid Phone Number"
    }

    // validate profile pic
    if (!registerData.profile_pic) {
        return "Please upload your passport photograph"
    }

    // validate sex
    if (!registerData.sex) {
        return "Please select gender"
    }

    // validate state of origin
    if (!registerData.country) {
        return "Please select country"
    }

    // validate state of origin
    if (!registerData.state_of_origin) {
        return "Please select state of origin"
    }

    // validate lga
    if (!registerData.lga) {
        return "Please select LGA or County"
    }

    // validate postal address
    if (!registerData.postal_address) {
        return "Please enter postal address"
    }

    // validate password
    if (!registerData.password) {
        return "Please enter password"
    }



    // validate date of birth
    if (!registerData.dob) {
        return "Please enter date of birth"
    }

    // validate qualification
    if (!registerData.qualifications[0].qualification) {
        return "Please select qualification"
    }
    // validate university attended
    if (!registerData.qualifications[0].universityAttended) {
        return "Please enter university attended"
    }
    // validate year of entry
    if (!registerData.qualifications[0].yearofEntry) {
        return "Please enter year of entry"
    }
    // validate year of graduation
    if (!registerData.qualifications[0].yearofGraduation) {
        return "Please enter year of graduation"
    }
    // validate registration number
    if (!registerData.qualifications[0].regNumber) {
        return "Please enter registration number"
    }
}


//========================== export tokenRegistration===============================
export const tokenRegistrationValidation = (registerData) => {
    // validate firstName
    if (!registerData.firstName) {
        return "Please enter first name"
    }
    // validate surname
    if (!registerData.surname) {
        return "Please enter surname"
    }

    // validate email
    if (!registerData.email) {
        return "Please enter email"
    }
    if (!isEmail(registerData.email)) {
        return "Please enter a valid email"
    }
    if (!equals(registerData.email, registerData.confirmEmail)) {
        return "Email doesn't match confirm email"
    }


    // validate phone
    if (!registerData.phone) {
        return "Please enter Phone Number"
    }
    if (!isMobilePhone(registerData.phone)) {
        return "Please enter valid Phone Number"
    }

    // validate profile pic
    if (!registerData.profile_pic) {
        return "Please upload your passport photograph"
    }

    // validate sex
    if (!registerData.sex) {
        return "Please select gender"
    }

    // validate state of origin
    if (!registerData.country) {
        return "Please select country"
    }

    // validate state of origin
    if (!registerData.state_of_origin) {
        return "Please select state of origin"
    }

    // validate lga
    if (!registerData.lga) {
        return "Please select LGA or County"
    }

    // validate postal address
    if (!registerData.address) {
        return "Please enter postal address"
    }

    // validate password
    if (!registerData.password) {
        return "Please enter password"
    }
    if (registerData.password.length < 6) {
        return "Password must not be less than 6 characters"
    }
    if (!equals(registerData.password, registerData.confirmPassword)) {
        return "password is not equal to confirm password"
    }

    // validate date of birth
    if (!registerData.dob) {
        return "Please enter date of birth"
    }

    // validate qualification
    if (!registerData.qualifications[0].qualification) {
        return "Please select qualification"
    }
    // validate university attended
    if (!registerData.qualifications[0].universityAttended) {
        return "Please enter university attended"
    }
    // validate year of entry
    if (!registerData.qualifications[0].yearofEntry) {
        return "Please enter year of entry"
    }
    // validate year of graduation
    if (!registerData.qualifications[0].yearofGraduation) {
        return "Please enter year of graduation"
    }
    // validate registration number
    if (!registerData.qualifications[0].regNumber) {
        return "Please enter registration number"
    }

    // Validate accessToken
    if (!registerData.accessToken) {
        return "Please provide a valid access token"
    }


}


// Create account validation
export const createAccountValidation = (accountData) => {
    if (!(accountData.firstName && accountData.surname)) {
        return "Please enter first name or surname"
    }

    if (!accountData.email) {
        return "Please enter email address"
    }

    if (!isEmail(accountData.email)) {
        return "Please enter valid email address"
    }

    if (!(accountData.password && accountData.confirmPassword)) {
        return "Please enter password or confirm password"
    }


    if (accountData.password.length < 6) {
        return "Passwords must be greater than 6 characters"
    }

    if (!equals(accountData.password, accountData.confirmPassword)) {
        return 'Passwords must be equal'
    }
}



// export Login Validation
export const loginValidation = (loginData) => {
    // validate email
    if (!loginData.email) {
        return "Please enter email address"
    }
    if (!isEmail(loginData.email)) {
        return "Please enter valid email address"
    }


    // validate password
    if (!loginData.password) {
        return "Please enter password"
    }
}