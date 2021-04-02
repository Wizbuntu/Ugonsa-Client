import React from 'react'

// paystack payment module
import { usePaystackPayment } from 'react-paystack';


// init config
const config = {
    reference: (new Date()).getTime(),
    email: process.env.REACT_APP_PAYSTACK_EMAIL,
    amount: 205000,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
};


const PaymentModule = (props) => {

    // init onSuccess
    const onSuccess = (reference) => {
       
    // call submitFunction from parent



    };

    // init onClose function
    const onClose = () => {
        
        console.log('closed')
    }



    // initialize payment
    const initializePayment = usePaystackPayment(config);

    return (
        <React.Fragment>
            
            <button type="button" onClick={() => {initializePayment(onSuccess, onClose)}} className="btn btn-success mt-3">Register</button>
            
        </React.Fragment>
    )
}

export default PaymentModule
