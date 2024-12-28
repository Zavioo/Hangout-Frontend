import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { addPostAPI } from '../Services/allApi';
import { PostResponseContext } from '../ContextApi/StateContext';

const Addpost = () => {

    const { setPostResponse } = useContext(PostResponseContext);
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    const [imageFileStatus, setImageFileStatue] = useState(false)
    const fileInputRef = useRef(null); // Ref for the file input
    const [isVideo, setIsVideo] = useState(false)
    const user = JSON.parse(sessionStorage.getItem("user"))
    const [postDetails, setPostDetails] = useState({
        username: user.username, profileImg: user.profilePic, title: "", description: "", media: ""
    })// for storing postDetails


    useEffect(() => {

        if (postDetails.media.type == 'image/png' || postDetails.media.type == 'image/jpeg' || postDetails.media.type == 'image/jpg') {
            setImageFileStatue(true)
            // createURL method is used to convert file type to url here URL is js class 
            setPreview(URL.createObjectURL(postDetails.media))
            console.log('Inside img useEffect if true');

        } else if (postDetails.media.type == 'video/mp4' || postDetails.media.type == 'video/x-matroska') {
            setImageFileStatue(true)
            // createURL method is used to convert file type to url here URL is js class 
            setPreview(URL.createObjectURL(postDetails.media))
            setIsVideo(true)
            console.log('Inside Video useEffect if true');
        } else {
            setIsVideo(false)
            setImageFileStatue(false)
            setPreview("")
            setPostDetails({ ...postDetails, postVideo: "" })
            console.log('Inside else if img and video is false ');

        }
    }, [postDetails.media])





    const handleAddPost = async () => {
        const { username, profileImg, title, description, media } = postDetails

        if (title && description && media) {
            // alert("Make api call")
            const reqBody = new FormData() // reqbody in formdata becuse its includes file
            reqBody.append("username", username)
            reqBody.append("profileImg", profileImg)
            reqBody.append("title", title)
            reqBody.append("description", description)
            reqBody.append("media", media)
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                // make api call
                try {
                    const result = await addPostAPI(reqBody, reqHeader)
                    if (result.status == 200) {
                        alert("Post added successfully!!!")
                        setPostResponse(result)
                        handleClear()
                        handleClose()
                    } else {
                        alert(result.response.data)
                    }
                } catch (err) {
                    console.log(err);

                }
            }
        } else {
            alert("Plzz add all fields")
        }
    }


    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleClear = () => {
        setPostDetails({ ...postDetails, title: "", description: "", media: "" })
        console.log(postDetails);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    }

    const closeAndClear = () => {
        handleClose()
        handleClear()
    }



    return (
        <>       {/* Add new add post layout */}
            <div className="card tw-max-w-xs tw-max-h-min tw-m-2 p-3" >
                <div className="card-body ">

                    <h6 className=' tw-mb-3 '> Create Post </h6>

                    <input value={postDetails.title} onChange={(e) => setPostDetails({ ...postDetails, title: e.target.value })} className="form-control form-control-sm " type="text" placeholder=" Title " id="inputSmall" />

                    <textarea value={postDetails.description} onChange={(e) => setPostDetails({ ...postDetails, description: e.target.value })} className="form-control my-3" id="exampleTextarea" placeholder=" What's on your mind " rows="3" style={{ height: "83px" }} ></textarea>
                    <div className='tw-flex tw-flex-col tw-items-center tw-justify-center' >

                        <img src={preview} className='mb-3 tw-max-h-52 ' alt="" />

                        {isVideo && <video className='mb-3 tw-max-h-52' autoPlay src={preview} >  Your browser does not support videos </video>}
                    </div>

                    <div className='tw-flex tw-items-center tw-justify-center' >
                        {/* add Image Button  */}
                        <label>
                            <input ref={fileInputRef} // Attach ref here 
                                onChange={(e) => setPostDetails({ ...postDetails, media: e.target.files[0] })} type="file" style={{ display: "none" }} />
                            <span className="btn btn-sm btn-outline-dark tw-ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </span>

                            {/* add Video Button  */}
                            <span className="btn btn-sm tw-ml-2 btn-outline-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </span>
                        </label>

                        {/* expand button */}
                        <span className=' btn btn-sm btn-outline-dark tw-ml-2' onClick={handleShow} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                        </span>

                        {/* share button */}
                        <button onClick={handleAddPost} className=' btn btn-sm btn-outline-dark tw-ml-2' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                            </svg>
                        </button>
                        {/* clear button */}
                        <button onClick={handleClear} className=' btn btn-sm btn-outline-dark tw-ml-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>

                    {!imageFileStatus &&
                        <div className='tw-text-main tw-font-light tw-my-2 tw-text-center' > Upload jpeg , jpg , png images <br /> or <br />
                            mp4 , mkv videos
                        </div>}
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title> Create Post </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <input value={postDetails.title} onChange={(e) => setPostDetails({ ...postDetails, title: e.target.value })} class="form-control form-control-sm " type="text" placeholder=" Title " id="inputSmall" />

                        <textarea value={postDetails.description} onChange={(e) => setPostDetails({ ...postDetails, description: e.target.value })} class="form-control my-3" id="exampleTextarea" placeholder=" What's on your mind " rows="3" style={{ height: "200px;" }} ></textarea>
                        {/* preview of Upload image */}
                        <div className='tw-flex tw-items-center tw-justify-center'>
                            <img src={preview} className='mb-3 tw-max-h-52 ' alt="" />

                            {isVideo && <video className='mb-3 tw-max-h-52' autoPlay src={preview} > Your browser does not support videos </video>}

                        </div>
                        {/* add Image Button  */}
                        <label>
                            <input ref={fileInputRef} // Attach ref here 
                                onChange={(e) => setPostDetails({ ...postDetails, media: e.target.files[0] })} type="file" style={{ display: "none" }} />
                            <span className="btn btn-sm btn-outline-dark tw-ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </span>

                            {/* add Video Button  */}
                            <span className="btn btn-sm tw-ml-2 btn-outline-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </span>
                        </label>
                        {/* clear button */}
                        <button onClick={handleClear} className=' btn btn-sm btn-outline-dark tw-ml-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        </button>
                        {!imageFileStatus &&
                            <div className='tw-text-main tw-font-light tw-my-2 tw-text-center' > Upload jpeg , jpg , png images <br /> or <br />
                                mp4 , mkv videos
                            </div>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddPost}>
                        Share
                    </Button>
                    <Button variant="secondary" onClick={closeAndClear}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default Addpost