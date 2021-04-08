import React, {useState, useEffect} from 'react'

// react router dom
import {Link, useHistory} from 'react-router-dom'

// import Pure modal
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

// import react hot toast
import toast, {Toaster} from 'react-hot-toast';

//Validator
import isEmail from 'validator/lib/isEmail';

// axios
import axios from '../Util/axiosConfig'



// init AdminUser component
const AdminUser = (props) => {

  // init useHistory
  const history = useHistory()

  // init useEffect
  useEffect(() => {
      // // check if user is an admin
      // if(props.authUser && !props.authUser.admin) {
      //   return history.push({pathname: '/profile'})
      // }
    // fetch all admin Users
    axios.get('/v1/api/admin/all')
    .then(({data}) => {
      
      // update AdminUserData state
      setAdminUserData(data.data)

    })
    .catch((error) => {
      console.log(error)
      return toast.error("Oops! An error has occurred")
    })
  }, [])

  // init isLoading state
  const [isLoading,
    setIsLoading] = useState(false)

    // init btnLoading 
    const [btnLoading, setBtnLoading] = useState(false)

    // init deleteBtnLoading
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false)

  // init Modal state
  const [modal,
    setModal] = useState(false)

    // init deleteModalState
    const [deleteModal, setDeleteModal] = useState({
      userId: "",
      isOpen: false,
      adminSurname: "",
      adminFirstName: ""
    })

    // destructure deleteModal
    const {userId, isOpen, adminFirstName, adminSurname} = deleteModal

  // init adminProfileImage state
  const [adminProfile,
    setAdminProfile] = useState('')

    // init adminUserData state
    const [adminUserData, setAdminUserData] = useState([])

  // init adminUser state
  const [adminUser,
    setAdminUser] = useState({surname: "", firstName: "", email: "", password: ""})

  // destructure adminUser
  const {surname, firstName, email, password} = adminUser

  // init openUploadWidget
  const openUploadWidget = () => {
    window
      .cloudinary
      .openUploadWidget({
        cloud_name: 'ugonsa',
        upload_preset: 'md69lmx5'
      }, (error, result) => {

        //   check if error
        if (error) {

         return console.log(error)
        
        }

        // update adminProfile state
        setAdminProfile(result[0].secure_url)

      })
  }

  //   init handleChange
  const handleChange = (data) => (e) => {
    //   update userAdmin data
    setAdminUser({
      ...adminUser,
      [data]: e.target.value
    })
  }

  //   init handleSubmit
  const handleSubmit = () => {
    //   update BtnLoading state
    setBtnLoading(true)

    //   get adminData
    const adminData = {
        surname: surname,
        firstName: firstName,
        email: email,
        password: password,
        profile_pic: adminProfile
    }

    // validate
    if(!adminData.surname) {
         //   update BtnLoading state
        setBtnLoading(false)
        return toast.error("Please enter surname")
    }
    if(!adminData.firstName) {
        //   update BtnLoading state
        setBtnLoading(false)
        return toast.error('please enter first name')
    }
    if(!adminData.email) {
        //   update BtnLoading state
        setBtnLoading(false)
        return toast.error('please enter email')
    }
    if(!adminData.password) {
        //   update BtnLoading state
        setBtnLoading(false)
        return toast.error("please enter password")
    }
    if(!adminData.profile_pic) {
          //   update BtnLoading state
          setBtnLoading(false)
          
          return toast.error("Please upload a profile image")
    }
    if(!isEmail(adminData.email)) {
        //   update BtnLoading state
        setBtnLoading(false)
        return toast.error("Please enter a valid email")
    }


    // axios post request to server [Create Admin User]
    axios.post('/v1/api/admin/user/create', adminData)
    .then(({data}) => {

        //   update BtnLoading state
        setBtnLoading(false)

      //  check if not success
      if(!data.success) {
        return toast.error(data.data)
      }

      // close Modal
      setModal(false)

      // return success
      return toast.success(data.data)

    })
    .catch((error) => {
        //   update BtnLoading state
        setBtnLoading(false)
        console.log(error)

        return toast.error("Oops! An error has occured")
    })

  }


  // init openDeleteModal function
  const openDeleteModal  = (userId, adminSName, adminFName) => {
    // check if no user id
    if(!userId) {
      return toast.error("Invalid Admin User")
    }

    // // update Delete Modal
    setDeleteModal({...deleteModal, isOpen: true, userId: userId, adminSurname: adminSName, adminFirstName: adminFName})
  }

  // init handleDeleteAdmin function
  const handleDeleteAdmin = (user_Id) => {
    // update deleteBtnLoading
    setDeleteBtnLoading(true)


    // check if no userId
    if(!user_Id) {
      // update deleteBtnLoading
      setDeleteBtnLoading(false)
      return toast.error("Invalid Admin User")
    }


    // axios delete request
    axios.delete(`/v1/api/admin/delete/${user_Id}`)
    .then(({data}) => {

      // update deleteBtnLoading
      setDeleteBtnLoading(false)

      // check if not success
      if(!data.success) {
        return toast.error(data.data)
      }

      // update DeleteModal
      setDeleteModal(false)

      // return success
      return toast.success(data.data)

    })
    .catch((error) => {
      // update deleteBtnLoading
     setDeleteBtnLoading(false)
      console.log(error)
    })

  }

  return (
    <React.Fragment>
      <Toaster/>
      <div className="container-fluid mt-3">

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <button
                  onClick={() => setModal(true)}
                  className="btn btn-secondary float-right">
                  <i
                    className="mdi mdi-plus"
                    style={{
                    cursor: "pointer"
                  }}></i>
                  Add Admin User</button>
                <h4 className="card-title float-left">Admin List</h4>
              </div>
              <div className="table-responsive">

                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="border-top-0">SURNAME</th>
                      <th className="border-top-0">FIRST NAME</th>
                      <th className="border-top-0">EMAIL</th>
                      <th className="border-top-0">STATUS</th>
                      <th className="border-top-0">ACTION</th>
                    </tr>
                  </thead>
                  {isLoading
                    ? <tbody>
                   btnLoading     <tr>
                          <td>
                            <p>Loading...</p>
                          </td>
                          <td>
                            <p>Loading...</p>
                          </td>
                          <td>
                            <p>Loading...</p>
                          </td>
                          <td>
                            <p>Loading...</p>
                          </td>
                        </tr>

                      </tbody>
                    : <tbody>
                      {adminUserData.map((user, index) => {
                        return <React.Fragment key={index}>
                             <tr>
                        <td className="txt-oflo">
                          {user.surname}
                        </td>
                        <td className="txt-oflo">
                        {user.firstName}
                        </td>
                        <td className="txt-oflo">{user.email}</td>
                        <td className="txt-oflo">
                          <span className="label label-success label-rounded">{user.admin && "admin"}</span>
                        </td>
                        <td className="txt-oflo">
                          <i
                            onClick={() => openDeleteModal(user.uid, user.surname, user.firstName)}
                            className="mdi mdi-delete h3 text-danger"
                            style={{
                            cursor: "pointer"
                          }}></i>
                        </td>

                      </tr>
                        </React.Fragment>
                      })}

                     
                    </tbody>
}

                </table>

              </div>

            </div>
          </div>
        </div>
        
        {/* Add admin User Modal */}
        <PureModal
          header="Add Admin User"
          width='500px'
          footer={< div > {btnLoading? <button className="btn btn-primary" disabled>Loading...</button> : <button onClick={() => handleSubmit()} className="btn btn-primary">Add User</button>}  </div>}
          isOpen={modal}
          closeButton="X"
          closeButtonPosition="header"
          onClose={() => {
          setModal(false);
          return true;
        }}>
          <form className="form-horizontal form-material">

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="col-md-12">Surname</label>
                  <div className="col-md-12">
                    <input
                      value={surname}
                      onChange={handleChange('surname')}
                      type="text"
                      placeholder="Enter surname"
                      className="form-control form-control-line"/>
                  </div>

                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="col-md-12">First Name</label>
                  <div className="col-md-12">
                    <input
                      value={firstName}
                      onChange={handleChange('firstName')}
                      type="text"
                      placeholder="Enter first name"
                      className="form-control form-control-line"/>
                  </div>

                </div>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="col-md-12">Email</label>
              <div className="col-md-12">
                <input
                  value={email}
                  onChange={handleChange('email')}
                  type="email"
                  placeholder="Enter email"
                  className="form-control form-control-line"/>
              </div>

            </div>

            {/* Password */}
            <div className="form-group">
              <label className="col-md-12">Password</label>
              <div className="col-md-12">
                <input
                  value={password}
                  onChange={handleChange('password')}
                  type="password"
                  placeholder="Enter Password"
                  className="form-control form-control-line"/>
              </div>

            </div>

            <div className="form-group">
              <div className="col-md-12">
                <div onClick={() => openUploadWidget()} className="btn btn-secondary">Upload Profile Image</div>
                {adminProfile && <p>Profile Image Uploaded</p>}

              </div>
            </div>

          </form>
        </PureModal>



        {/* Delete Modal */}
        <PureModal
          header="Delete Admin User"
          width='500px'
          footer={< div > {deleteBtnLoading? <button className="btn btn-danger" disabled>Loading...</button> : <button onClick={() => handleDeleteAdmin(userId)} className="btn btn-danger">Delete</button>}  </div>}
          isOpen={isOpen}
          closeButton="X"
          closeButtonPosition="header"
          onClose={() => {
          setDeleteModal({...deleteModal, isOpen: false});
          return true;
        }}>

          <p>Do you want to delete <b>{adminSurname} {adminFirstName}</b>'s account?</p>
        </PureModal>

      </div>

    </React.Fragment>
  )
}

// export admin user component
export default AdminUser
