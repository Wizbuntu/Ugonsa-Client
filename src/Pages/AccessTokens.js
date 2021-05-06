import React, {useState, useEffect} from 'react'


// import react hot toast
import toast, {Toaster} from 'react-hot-toast';


// react router dom
import {Link, useHistory} from 'react-router-dom'

// import Pure modal
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

// axios
import axios from '../Util/axiosConfig'



// init AccessTokens components
const AccessTokens = () => {

    // init useEffect
    useEffect(() => {
        // axios GET to fetch all tokens
        axios.get('/v1/api/get/access/tokens')
        .then(({data}) => {
            // check if not success
            if(!data.success) {
              return toast.error(data.data)
            }

            console.log(data.data)

            // update tokenData state 
            setTokenData((tokens) => [...tokens, ...data.data])

        })
        .catch((error) => {
          console.log(error)
          return toast.error("Oops! An error has occured, please try again")
        })
    }, [])

    // init token state 
    const [accessTokenCount, setAccessTokenCount] = useState(0)

    // init tokenData 
    const [tokenData, setTokenData] = useState([])

    // init Modal state
    const [modal, setModal] = useState(false)

   // init isLoading state
    const [isLoading, setIsLoading] = useState(false)

    // init btnLoading state
    const [btnLoading, setBtnLoading] = useState(false)

    // init deleteBtnLoading state
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false)

    // init deleteModalState
    const [deleteModal, setDeleteModal] = useState({
        tokenID: "",
        token: "",
        isOpen: false
      })

    //   destructure deleteModal
    const {tokenID, token, isOpen} = deleteModal


    // init handleOpenDeleteModal func
    const openDeleteModal = (token_id, _token) => {
        // check if token_id
        if(!(token_id && _token)) {
          return toast.error(" Oops! Token does not exist")
        }

        // update deleteModal state 
        setDeleteModal({...deleteModal, tokenID: token_id, token: _token, isOpen: true})
    }

    // init handleSubmit func 
    const handleSubmit = () => {
        // init btnLoading to true
        setBtnLoading(true)

      
        // check if accessToken
        if(!accessTokenCount) {
            // update btnLoading 
            setBtnLoading(false)

            return toast.error("Access token cannot be 0")
        }
        
        // init _token
        const _token = {
          accessTokenCount
        }

       

        // axios post request to create token endpoint
        axios.post('/v1/api/create/access/token', _token)
        .then(({data}) => {

          // update btnLoading 
          setBtnLoading(false)

          // check if not success
          if(!data.success) {
            return toast.error(data.data)
          }

          // update tokenData state
          setTokenData((tokens) => [...tokens, data.token])  

          console.log(tokenData)
          
          // return success
          return toast.success(data.message)

        })
        .catch((error) => {
          // update btnLoading 
          setBtnLoading(false)

          console.log(error)
          
        })
    }

    // init handleDeleteToken
    const handleDeleteToken = () => {
          // check if tokenID
          if(!tokenID) {
            return toast.error("Oops! Token does not exist")
          }

          // axios delete request
          axios.delete(`/v1/api/delete/access/${tokenID}`)
          .then(({data}) => {
            // if not success
              if(!data.success) {
                return toast.error(data.data)
              }

              // get index of token
              const filteredToken = tokenData.filter((_token) => _token.token !== token)

              // update tokenData state 
              setTokenData(filteredToken)

              // update deleteModal
              setDeleteModal({...deleteModal, isOpen: false})

              return toast.success(data.data)
          })
          .catch((error) => {
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
                    Create Access Tokens</button>
                  <h4 className="card-title float-left">Token List</h4>
                </div>
                <div className="table-responsive">
  
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="border-top-0">TOKEN</th>
                        <th className="border-top-0">USAGE COUNT</th>
                        <th className="border-top-0">STATUS</th>
                        <th className="border-top-0">ACTION</th>
                      </tr>
                    </thead>
                    {isLoading
                      ? <tbody>
                         <tr>
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
                        {tokenData.map((_token, index) => {
                          return  <React.Fragment key={index}>
                          <tr>
                            <td className="txt-oflo">
                                  {_token.token}
                            </td>
                            <td className="txt-oflo">
                                 {`${_token.usageCount} / ${_token.totalCount}`}
                            </td>
                          
                            <td className="txt-oflo">
                              {_token.usageCount > 0 ?  <span className="label label-success label-rounded">valid</span> : 
                               <span className="label label-danger label-rounded">exhausted</span>
                              }
                             
                            </td>
                            <td className="txt-oflo">
                              <i
                                onClick={() => openDeleteModal(_token.uid, _token.token)}
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
          
          {/* Add access token Modal */}
          <PureModal
            header="Add Access Tokens"
            width='500px'
            footer={< div > {btnLoading? <button className="btn btn-primary" disabled>Loading...</button> : <button onClick={() => handleSubmit()} className="btn btn-primary">Create Token</button>}  </div>}
            isOpen={modal}
            closeButton="X"
            closeButtonPosition="header"
            onClose={() => {
            setModal(false);
            return true;
          }}>
            <form className="form-horizontal form-material">
  
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="col-md-12">Total Usage</label>
                    <small className="col-md-12">Note: This represents number of members to be registered.</small>
                    <div className="col-md-12">
                      <input
                        value={accessTokenCount}
                        onChange={(e) => setAccessTokenCount(e.target.value)}
                        type="number"
                        placeholder="Token Number"
                        className="form-control form-control-line"/>
                       
                        <small className="col-md-12">Example: 5 tokens for 5 users</small>
                    </div>
  
                  </div>
                </div>
              </div>
  
            </form>
          </PureModal>
  
  
  
          {/* Delete Modal */}
          <PureModal
            header="Delete Access TOken"
            width='500px'
            footer={< div > {deleteBtnLoading? <button className="btn btn-danger" disabled>Loading...</button> : <button onClick={() => handleDeleteToken()} className="btn btn-danger">Delete</button>}  </div>}
            isOpen={isOpen}
            closeButton="X"
            closeButtonPosition="header"
            onClose={() => {
            setDeleteModal({...deleteModal, isOpen: false});
            return true;
          }}>
  
            <p>Do you want to delete token <b>{token}</b>?</p>
          </PureModal>
  
        </div>
  
      </React.Fragment>
    )
}

export default AccessTokens
