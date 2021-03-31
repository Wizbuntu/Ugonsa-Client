import React, {useEffect, useState} from 'react'

// import axios 
import axios from '../Util/axiosConfig'

// import react hot toast
import toast, { Toaster } from 'react-hot-toast';

// import react loading skeleton
import Skeleton from 'react-loading-skeleton';


// init Dashboard Detail
const DashboardDetail = (props) => {

    // init userId
  const userId =  props && props.match.params.id

//   init userData state
const [userData, setUserData] = useState({})

// init Loading state
const [Loading, setLoading] = useState(true)

//   init useEffect
    useEffect(() => {
        axios.get(`/v1/api//user/${userId}`)
        .then(({data}) => {
            // update Loading state to false
            setLoading(false)

            console.log(data)

            //    check if success
            if(!data.success) {

                return toast.error("Oops! An error has occured")
            }

            // update userData state
            setUserData(data.data)

        })
        .catch((error) => {
            console.log(error)
        })

    }, [])

  return (
    <React.Fragment>
        <Toaster/>
             <div className="container-fluid">

             <div className="row">
     
               <div className="col-lg-4 col-xlg-3 col-md-5">
               {!Loading ? 
                 <div className="card">
                   <div className="card-body">
                       <center className="m-t-30">
                       <img
                         src={userData.profile_pic || '/assets/images/profile.png'}
                         className="rounded-circle"
                         width="150"/>
                       <h4 className="card-title m-t-20">{userData.registrationNumber}</h4>
     
                       <div className="row text-center justify-content-md-center">
                        {userData.verification_status === "pending" ? <span className="label label-warning label-rounded">pending</span> :
                        userData.verification_status === "verified" ? <span className="label label-success label-rounded">verified</span> :
                        userData.verification_status === "unverified"? <span className="label label-danger label-rounded">unverified</span> :
                        <span className="label label-secondary label-rounded">loading...</span>

                        }
                       
                       </div>
                     </center> 
                    
                     
                     
                   </div>
                   <div>
                     <hr/>
                   </div>
                   <div className="card-body text-center justify-content-md-center">
                     <br/>
                     <button className="btn btn-secondary">
                       <i className="mdi mdi-download"></i>
                       Generate ID Card</button>
                   </div>
                 </div> : 
                    <div className="card">
                         <div className="card-body text-center justify-content-md-center">
                            <center className="m-t-30 m-b-30">
                            <Skeleton count={5} />
                            </center>
                         </div>
                    </div>
                    
                    }
               </div>
     
               <div className="col-lg-8 col-xlg-9 col-md-7">
                   {!Loading ? <div className="card">
                   <div className="card-body">
                     <form className="form-horizontal form-material">
                       <div className="form-group">
                         <label className="col-md-12">Full Name</label>
                         <div className="col-md-12">
                           <input
                             type="text"
                             value={userData.fullName}
                             className="form-control form-control-line"
                             disabled/>
                         </div>
                       </div>
                       <div className="row">
                           {/* email */}
                           <div className="col-md-6">
                            <div className="form-group">
                                <label>Email</label>
                               
                                <input
                                    type="email"
                                    value={userData.email}
                                    className="form-control form-control-line"
                                    name="example-email"
                                    id="example-email"
                                    disabled/>
                           
                            </div>
                            </div>
                                {/* phone */}
                            <div className="col-md-6">
                            <div className="form-group">
                                <label>Phone</label>
                               
                                <input
                                    type="phone"
                                    value={userData.phone}
                                    className="form-control form-control-line"
                                    disabled/>
                            </div>
                            </div>
                       
                          
                       </div>
                       
                       <div className="form-group">
                         <label className="col-md-12">Password</label>
                         <div className="col-md-12">
                           <input type="password" className="form-control form-control-line"/>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="col-md-12">Phone No</label>
                         <div className="col-md-12">
                           <input
                             type="text"
                             placeholder="123 456 7890"
                             className="form-control form-control-line"/>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="col-md-12">Message</label>
                         <div className="col-md-12">
                           <textarea rows="5" className="form-control form-control-line"></textarea>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="col-sm-12">Select Country</label>
                         <div className="col-sm-12">
                           <select className="form-control form-control-line">
                             <option>London</option>
                             <option>India</option>
                             <option>Usa</option>
                             <option>Canada</option>
                             <option>Thailand</option>
                           </select>
                         </div>
                       </div>
                       <div className="form-group">
                         <div className="col-sm-12">
                           <button className="btn btn-success">Update Profile</button>
                         </div>
                       </div>
                     </form>
                   </div>
                 </div> : 
                    <div className="card">
                    <div className="card-body text-center justify-content-md-center">
                       <center className="m-t-30 m-b-30">
                       <Skeleton count={15} style={{marginTop: "16px"}} />
                       </center>
                    </div>
                    </div>
                 }
                 
               </div>
     
             </div>
     
           </div>
        

     

    </React.Fragment>
  )
}

export default DashboardDetail
