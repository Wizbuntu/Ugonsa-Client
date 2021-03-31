import React, {useState, useEffect} from 'react'

// import useUser hook
import {useUser} from '../Util/customHooks'

// import fuse js
import Fuse from 'fuse.js'
import { Link } from 'react-router-dom'


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

    // init userSearch state
    const [UserData, setUserData] = useState([])

    // get users from swr
    const {users, isError, isLoading} = useUser('/v1/api/users/all')

    // init useEffect
    useEffect(() => {
    //    check if users, then update userData state
    if(users) {
        setUserData(users.data)
    }


    }, [users])
    
    // instantiate fuse object
    const searchFuse = new Fuse(users && users.data, searchFuseOptions)
    const filterFuse = new Fuse(users && users.data, filterFuseOptions)
    
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
            setUserData(users && users.data)
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
                console.log(userFilterResult)
                setUserData(userFilterResult)
            } else {
                setUserData(userFilterResult)
            }

        } else {
            setUserData(users && users.data)
        } 
    }

    return (
        <React.Fragment>  
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
            <div className="col-lg-4 col-xlg-4 col-md-8">
                <div className="card">
                    <div className="card-body pb-1">
                    <form className="form-horizontal form-material">
                    <div className="form-group">                       
                        <div className="col-sm-12">
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
                                    <th className="border-top-0">NAME</th>
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
                                             <td className="txt-oflo"><Link style={{textDecoration: "none", color: "#6A7A8C"}} to={`/user/${user.uid? user.uid : user.item.uid}`}>{user.fullName? user.fullName: user.item.fullName}</Link></td>
                                             <td className="txt-oflo">{user.registrationNumber ? user.registrationNumber: user.item.registrationNumber}</td>
                                             {user.verification_status || user.item.verification_status === "pending" ? <td><span className="label label-warning label-rounded">pending</span> </td> : 
                                             user.verification_status || user.item.verification_status === "verified" ? <td><span className="label label-success label-rounded">verified</span> </td> :
                                             user.verification_status || user.item.verification_status === "unverified" ? <td><span className="label label-danger label-rounded">unverified</span> </td> : 
                                             <td><span className="label label-secondary label-rounded">loading...</span> </td>
                                             }
                                             
                                             <td><i className="fa fa-trash fa-2x text-danger" style={{cursor: "pointer"}} aria-hidden="true"></i></td>
                                             </tr>
                                     </React.Fragment>
                                     })}
                                 </tbody>
                                 
                                }
                               
                                                 
                        </table>
                    
                    </div>
                    <div className="container">
                        <button className="btn btn-primary mt-3 mb-3" style={{margin: 'auto', display: "block"}}>Load More</button>
                    </div>
                </div>
            </div>
        </div>
        
        </div>

        </React.Fragment>
    )
}


// export Dashboard
export default Dashboard
