import React from 'react'



// init Profile component
const Profile = (props) => {


    return (
        <React.Fragment>     

                <div className="container-fluid">
               
                <div className="row">
                  
                    <div className="col-lg-4 col-xlg-3 col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <center className="m-t-30"> <img src="../../assets/images/users/5.jpg" className="rounded-circle" width="150" />
                                    <h4 className="card-title m-t-10">Hanna Gover</h4>
                                   
                                    <div className="row text-center justify-content-md-center">
                                       <div className="btn btn-primary">Update Passport Photo</div>
                                    </div>
                                </center>
                            </div>
                            <div>
                                <hr /> </div>
                            <div className="card-body text-center justify-content-md-center"> 
                                <br/>
                                <button className="btn btn-secondary"><i className="mdi mdi-download"></i> Generate ID Card</button>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-lg-8 col-xlg-9 col-md-7">
                        <div className="card">
                            <div className="card-body">
                                <form className="form-horizontal form-material">
                                    <div className="form-group">
                                        <label className="col-md-12">Full Name</label>
                                        <div className="col-md-12">
                                            <input type="text" placeholder="Johnathan Doe" className="form-control form-control-line" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-md-12">Email</label>
                                        <div className="col-md-12">
                                            <input type="email" placeholder="johnathan@admin.com" className="form-control form-control-line" name="example-email" id="example-email" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-12">Password</label>
                                        <div className="col-md-12">
                                            <input type="password" className="form-control form-control-line" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-12">Phone No</label>
                                        <div className="col-md-12">
                                            <input type="text" placeholder="123 456 7890" className="form-control form-control-line" />
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
                        </div>
                    </div>
                  
                </div>
               
            </div>         
        </React.Fragment>
    )
}


// export Profile
export default Profile
