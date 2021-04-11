import React, {useState, useEffect, useRef} from 'react'

// import useUser hook
import {useUser} from '../Util/customHooks'

// import fuse js
import Fuse from 'fuse.js'
import { Link } from 'react-router-dom'

// import Pure modal
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

// import react hot toast
import toast, {Toaster} from 'react-hot-toast';

// react router dom
import {useHistory} from 'react-router-dom'

// import react Helmet
import { Helmet, HelmetProvider } from 'react-helmet-async';

// import axios 
import axios from '../Util/axiosConfig'


// inti searchFuseOptions
const searchFuseOptions = {
    isCaseSensitive: true,
    tokenize: false,
    matchAllTokens: true,
    findAllMatches: true,
    useExtendedSearch: true,
    keys: [
        "registrationNumber",
      ]
}

// init filterFuseOptions
const filterFuseOptions = {
    isCaseSensitive: true,
    tokenize: false,
    matchAllTokens: true,
    findAllMatches: true,
    useExtendedSearch: true,
    keys: [
        "verification_status",
      ]
}


// init Dashboard
const Dashboard = (props) => {

    // init useHistory
    const history = useHistory()

    // init userSearch state
    const [UserData, setUserData] = useState([])

    // init modal state
    const [modal, setModal] = useState(false);

    // init modalData
    const [modalData, setModalData] = useState({
        userId: "",
        regNumber: ""
    })

    // init userTotal state
    const [userTotal, setUserTotal] = useState(0)

    // init pageIndex state
    const [pageIndex, setPageIndex] = useState(1);

    // init usersHolder
    const usersHolder = useRef([])

    
    // get users from api endpoint
    const {users, isError, isLoading} = useUser(`/v1/api/users/all?page=${pageIndex}`)

    // init useEffect
    useEffect(() => {
           // check if authenticated
            if(!props.authUser) {
                return history.push({pathname: '/login'})
            }

        // check if users, then update userData state
        if(users && users.data) {
            console.log(users)
            usersHolder.current = [...usersHolder.current, ...users.data]
            console.log(usersHolder.current)
            setUserData(usersHolder.current)
            setUserTotal(users.total)
        }
        
    }, [users])

    
    // instantiate fuse object
    const searchFuse = new Fuse(usersHolder.current, searchFuseOptions)
    const filterFuse = new Fuse(usersHolder.current, filterFuseOptions)
    
    // init handleSearch function
    const handleSearch = (keyword) => {

        // check if keyword
        if(keyword) {
            // get Search result
            const userSearchResult = searchFuse.search(`=${keyword}`)

            // check if userSearchResult
            if(userSearchResult.length !== 0) {
                console.log(userSearchResult)
                setUserData(userSearchResult)
            } else {
                setUserData(userSearchResult)
            }

        } else {
            setUserData(usersHolder.current)
        } 

    }

    // init handleFilter function
    const handleFilter = (keyword) => {
         // check if keyword
         if(keyword) {
            // get Search result
            const userFilterResult = filterFuse.search(`=${keyword}`)
           
            // check if userSearchResult
            if(userFilterResult.length !== 0) {
               
                setUserData(userFilterResult)
               
            } else {
                setUserData(userFilterResult)
            }

        } else {
            setUserData(usersHolder.current)
        } 
    }


    // init renderverification status function
    const renderVerificationStatus = (user) => {
            // check if user.item exist 
            if(user.item) {
                if(user.item.verification_status === "pending") {
                    return <td><span className="label label-warning label-rounded">pending</span> </td>
                }
                if(user.item.verification_status === "verified") {
                    return <td><span className="label label-success label-rounded">verified</span> </td>
                }
                if(user.item.verification_status === "unverified") {
                    return <td><span className="label label-danger label-rounded">unverified</span> </td>
                }
                return <td><span className="label label-primary label-rounded">loading</span> </td>
            } else {

               if(user.verification_status === "pending") {
                   return <td><span className="label label-warning label-rounded">pending</span> </td>
               }
               if(user.verification_status === "verified") {
                return <td><span className="label label-success label-rounded">verified</span> </td>
                }
                if(user.verification_status === "unverified") {
                return <td><span className="label label-danger label-rounded">unverified</span> </td>
                }
                return <td><span className="label label-primary label-rounded">loading</span> </td>
            }
    }


    // init handleOpenModal function
    const handleOpenModal = (userId, regNum) => {

        // update OpenModal
        setModal(true)

        // update Modal Data
        setModalData({...modalData, userId: userId, regNumber: regNum})
    }


    // init deleteUser function
    const handleDeleteUser = (userId) => {
        // check if userId
        if(!userId) {
            console.log("Delete Error, No user id found")
            return toast.error("Oops! An error has occured")
        }

        // axios request to delete user
        axios.delete(`/v1/api/user/delete/${userId}`)
        .then(({data}) => {

            // update modal to false
            setModal(false)

            // check if not success
            if(!data.success) {
                console.log(data.data)
                return toast.error(data.data)
            }

            

            // return success
            return toast.success(data.data)
        })
        .catch((error) => {
           // update modal to false
           setModal(false)

            console.log(error)
            return toast.error("Oops! An error has occured, Failed to delete")
        })
        
    }


    return (
        <React.Fragment>  
            <HelmetProvider>
            <Toaster/>

            <Helmet>
              
              <title>Ugonsa Dashboard</title>
             
            </Helmet>

        <div className="container-fluid mt-3">
        <div className="row">
            <div className="col-lg-8 col-xlg-8 col-md-8">
                <div className="card">
                    <div className="card-body pb-1">
                        <form className="form-horizontal form-material">
                            <div className="form-group">
                                <div className="col-md-12">
                                    <input onChange={(event) => handleSearch(event.target.value)} type="text" placeholder="Search by registration number" className="form-control form-control-line" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-xlg-4 col-md-4">
                <div className="card">
                    <div className="card-body pb-1">
                    <form className="form-horizontal form-material">
                    <div className="form-group">                       
                        <div className="col-sm-12 col-md-12">
                            <select onChange={(event) => handleFilter(event.target.value)} className="form-control form-control-line">
                                <option value="">select verification status</option>
                                <option value="verified">verified</option>
                                <option value="pending">pending</option>
                                <option value="unverified">unverified</option>
                            </select>
                        </div>
                    </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Registered Members</h4>
                    </div>
                    <div className="table-responsive">
                    
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="border-top-0">SURNAME</th>
                                    <th className="border-top-0">FIRST NAME</th>
                                    <th className="border-top-0">REGISTRATION NUMBER</th>
                                    <th className="border-top-0">STATUS</th>
                                    <th className="border-top-0">ACTION</th>
                                </tr>
                            </thead>
                                
                                {isLoading ? <tbody>
                                        <tr>
                                        <td><p>Loading...</p></td> 
                                        <td><p>Loading...</p></td> 
                                        <td><p>Loading...</p></td> 
                                        <td><p>Loading...</p></td> 
                                        </tr>
                                       
                                    </tbody>:
                                     <tbody>
                                    
                                     {UserData && UserData.map((user, index) => {
                                     return <React.Fragment key={index}>
                                              <tr>
                                             <td className="txt-oflo"><Link style={{textDecoration: "none", color: "#6A7A8C"}} to={`/user/${user.uid? user.uid : user.item.uid}`}>{user.surname? user.surname: user.item.surname}</Link></td>
                                             <td className="txt-oflo"><Link style={{textDecoration: "none", color: "#6A7A8C"}} to={`/user/${user.uid? user.uid : user.item.uid}`}>{user.firstName? user.firstName: user.item.firstName}</Link></td>
                                             <td className="txt-oflo">{user.registrationNumber ? user.registrationNumber: user.item.registrationNumber}</td>
                                             {renderVerificationStatus(user)}
                                             <td className="txt-oflo"> <i onClick={() => handleOpenModal(user.uid || user.item.uid, user.registrationNumber || user.item.registrationNumber)} className="mdi mdi-delete h3 text-danger" style={{cursor: "pointer"}}></i></td>
                                             </tr>
                                     </React.Fragment>
                                     })}
                                 </tbody>
                                 
                                }
                               
                                                 
                        </table>

                        {UserData && UserData.length === 0 && <div className="text-center">
                                        <img src="/assets/images/no_data.svg" className="img-fluid mt-3" style={{width: 220, height: 220}}></img>
                                        <h3 className="mt-3 text-secondary text-center mb-5"> <b>No Registered Members Yet</b></h3>
                                    </div>}
                    
                    </div>
                    {UserData && UserData.length !== 0 && <div className="container">
                        {UserData.length < userTotal && <button type="button" onClick={() => setPageIndex(pageIndex + 1)} className="btn btn-primary mt-3 mb-3" style={{margin: 'auto', display: "block"}}>Load More</button>}
                        
                    </div>}
                    
                </div>
            </div>
        </div>

        <PureModal
            footer={
                <div>
                <button onClick={() => handleDeleteUser(modalData.userId)} className="btn btn-danger">Delete</button>
                </div>
            }
            isOpen={modal}
            closeButton="X"
            closeButtonPosition="header"
            onClose={() => {
                setModal(false);
                return true;
            }}
            >
            <p className="h6">Do you want to delete <br/> {modalData.regNumber} ? </p>
        </PureModal>
        
        </div>

        </HelmetProvider>
        </React.Fragment>
    )
}


// export Dashboard
export default Dashboard
