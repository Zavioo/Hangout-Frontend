import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import SERVER_URL from '../Services/serverURL';
import { updatePostAPI } from '../Services/allApi';
import { PostResponseContext } from '../ContextApi/StateContext';


const EditPost = ({ post }) => {
    // console.log(post);
    const { setPostResponse } = useContext(PostResponseContext);
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    // const [existingMedia, setExistingMedia] = useState()
    const [imageFileStatus, setImageFileStatue] = useState(false)
    const fileInputRef = useRef(null); // Ref for the file input
    const [isVideo, setIsVideo] = useState(false)
    const [postDetails, setPostDetails] = useState({
        id: post._id, username: post.username, title: post.title, description: post.description, media: ""
    })// for storing postDetails

    const mediaType = post.media.split('.').pop().toLowerCase(); //To Get file extension

    useEffect(() => {

        if (postDetails.media.type == 'image/png' || postDetails.media.type == 'image/jpeg' || postDetails.media.type == 'image/jpg') {
            setImageFileStatue(true)
            // createURL method is used to convert file type to url here URL is js class 
            setPreview(URL.createObjectURL(postDetails.media))
            // console.log('Inside img useEffect if true');

        } else if (postDetails.media.type == 'video/mp4' || postDetails.media.type == 'video/x-matroska') {
            setImageFileStatue(true)
            // createURL method is used to convert file type to url here URL is js class 
            setPreview(URL.createObjectURL(postDetails.media))
            setIsVideo(true)
            // console.log('Inside Video useEffect if true');
        } else {
            setIsVideo(false)
            setImageFileStatue(false)
            setPreview("")
            setPostDetails({ ...postDetails, postVideo: "" })
            // console.log('Inside else if img and video is false ');
        }
    }, [postDetails.media])


    const handleUpdatePost = async () => {
        const { id, username, title, description, media } = postDetails

        if (title && description) {
            // alert("Make api call")
            const reqBody = new FormData() // reqbody in formdata becuse its includes file
            reqBody.append("username", username)
            reqBody.append("title", title)
            reqBody.append("description", description)
            preview ? reqBody.append("media", media) : reqBody.append("media", post.media)
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                try {
                    const result = await updatePostAPI(id, reqBody, reqHeader)
                    if (result.status == 200) {
                        alert("Post Update successfully!!!")
                        setPostResponse(result)
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
    const handleClose = () => {
        setPostDetails({ ...postDetails, title: post.title, description: post.description, media: "" })
        // console.log(postDetails);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
        setShow(false)
    }

    const handleClear = () => {
        setPostDetails({ ...postDetails, title: post.title, description: post.description, media: "" })
        // console.log(postDetails);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    }

    const closeAndClear = () => {
        handleClose()
        handleClear()
    }


    return (
        <>
            <button onClick={handleShow} className="mx-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-size-6 tw-text-black"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                </svg>
            </button>

            <Modal show={show} onHide={handleClose} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title> Create Post </Modal.Title>
                </Modal.Header>
                <div className='m-3'>
                    <input value={postDetails.title} onChange={(e) => setPostDetails({ ...postDetails, title: e.target.value })} className="form-control form-control-sm " type="text" placeholder=" Title " id="inputSmall" />

                    <textarea value={postDetails.description} onChange={(e) => setPostDetails({ ...postDetails, description: e.target.value })} className="form-control my-3" id="exampleTextarea" placeholder=" What's on your mind " rows="3" style={{ height: "100px" }} ></textarea>
                    {/* preview of Upload image or Video */}
                    <div className='tw-flex tw-items-center tw-justify-center'>

                        {['mp4', 'mkv'].includes(mediaType) || isVideo === true ? (
                            <video className='mb-3 tw-max-h-52 ' controls src={preview ? preview : `${SERVER_URL}/uploads/${post.media}`} ></video>
                        ) : (
                            <img className='mb-3 tw-max-h-52 ' src={preview ? preview : `${SERVER_URL}/uploads/${post.media}`} alt="Media" />
                        )}

                    </div>
                    {/* add Image Button  */}
                    <label>
                        <input ref={fileInputRef} // Attach ref here 
                            onChange={(e) => setPostDetails({ ...postDetails, media: e.target.files[0] })} type="file" style={{ display: "none" }} />
                        <span className="btn btn-sm btn-outline-dark tw-ml-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </span>

                        {/* add Video Button  */}
                        <span className="btn btn-sm tw-ml-2 btn-outline-dark">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
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
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdatePost}>
                        Share
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditPost