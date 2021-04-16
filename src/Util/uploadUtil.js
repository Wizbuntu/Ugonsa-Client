// import react
import React from 'react'

// import uppy core
import Uppy from '@uppy/core'

// import uppy xhr-upload
import XHRUpload from '@uppy/xhr-upload'

// import uppy Dashboard
import {Dashboard} from '@uppy/react'

// import react hot toast
import toast, { Toaster } from 'react-hot-toast';

// import uppy css
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'


// instantiate new Uppy object
const uppy = new Uppy({
  meta: {
    type: 'passport'
  },
  restrictions: {
    maxNumberOfFiles: 1,
    maxFileSize: 307000,
    allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png']
  },
  autoProceed: true
})


// use hxrUpload
uppy.use(XHRUpload, {
    endpoint: "https://register.ugonsa.org/v1/api/upload",
    method: 'post',
    formData: true,
    fieldName: 'profile_pic',
})


// init UploadUtil component
const UploadUtil = (props) => {

// init onComplete uppy function
uppy.on('complete', (result) => {

    // check if result
    if(!result.successful && result.successful[0].response.body.success) {
        // return error
        console.log(result.successful[0].response.body.message)
        return toast.error(result.successful[0].response.body.message)
    }

    // if success, pass to parent
    props.uploadImageUrl(result.successful[0].response.body.data)
   
  })



  return (
    <React.Fragment>
       <Toaster />
      <Dashboard uppy={uppy}
       {...props}
       note="Upload Passport Photograph: Not more than 300kb"
       proudlyDisplayPoweredByUppy = {false}
       height = {300}
       width = {"auto"}
       locale={{
         strings: {
          dropPaste: "Drop or %{browse} Passport Photograph",
         }
       }}
       />

    </React.Fragment>
  )
}



// export 
export default UploadUtil