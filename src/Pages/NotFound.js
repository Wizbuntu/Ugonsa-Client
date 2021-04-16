import React from 'react'

// Footer
import Footer from '../Components/Footer'

const NotFound = () => {
    return (
        <React.Fragment>

            <div className="container h-100">
                <div className="row">
                    <div className="col-md-12 text-center" style={{marginTop: "10%"}}>
                        <img alt="not-found" src="/assets/images/notFound.svg" className="img-fluid" style={{height: 300}}/>
                        <h1>Oops! Page Not Found</h1>
                    
                    </div>
                </div>

                <Footer/>
            </div>
            
        </React.Fragment>
    )
}

export default NotFound
