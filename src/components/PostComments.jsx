import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { addCommentAPI, removeCommentAPI } from '../Services/allApi'
import { PostResponseContext } from '../ContextApi/StateContext';
import SERVER_URL from '../Services/serverURL';


const PostComments = ({ postsId, commments }) => {
    const [comment, setComment] = useState()
    const [show, setShow] = useState(false)
    const { setPostResponse } = useContext(PostResponseContext);
    const user = JSON.parse(sessionStorage.getItem("user"));

    const userId = user._id
    const username = user.username
    const userProfilePic = user.profilePic

    const handleClose = () => {
        setShow(false)
        setComment("")
    }
    const handleShow = () => setShow(true);

    const handleAddComment = async (id) => {
        if (comment) {
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                const reqBody = { userId, comment, username, userProfilePic }
                try {
                    const result = await addCommentAPI(id, reqBody, reqHeader);
                    if (result.status === 200) {
                        setPostResponse(result.data)
                        setComment("")
                    }
                } catch (error) {
                    console.error('Error adding comments:', error);
                }
            }
        } else {
            alert("Plz Write Somthing...!!! ")
        }

    }

    const handleRemoveComment = async (id) => {
        console.log(id);
        const reqBody = { postId: postsId }
        try {
            const result = await removeCommentAPI(id, reqBody);
            if (result.status === 200) {
                setPostResponse(result.data)
            }
        } catch (error) {
            console.error('Error adding comments:', error);
        }
        
    }

    return (
        <div className=' tw-flex tw-ml-2' >
            <button onClick={handleShow}
                className="tw-flex tw-items-center tw-justify-center tw-p-1 tw-text-slate-600 hover:tw-text-black tw-rounded-lg tw-transition tw-duration-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="tw-size-6">
                    <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
                </svg>
            </button>
            <p>0</p>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title> Share Your Thoughts </Modal.Title>
                </Modal.Header>
                <Modal.Body className='tw-max-h-96 tw-overflow-y-auto'>
                    {commments.length !== 0 ?
                        commments.map(comment => ( // Use map instead of forEach
                            <div className='tw-p-5 tw-shadow-md tw-m-4' key={comment._id}> {/* Add a unique key prop */}
                                <div className='tw-flex tw-items-center'>
                                    <img className='tw-size-12 tw-mb-3 tw-rounded-md' src={`${SERVER_URL}/uploads/${comment.userProfilePic}`} alt="pic" />
                                    <h6 className='tw-pl-2'>{comment.username}</h6>
                                </div>
                                <p className='tw-ml-3'>{comment.comment}</p>
                                {/* delete button */}
                                {comment.username == username &&
                                    <div className='tw-w-full tw-justify-end tw-flex'>
                                        <button onClick={() => handleRemoveComment(comment._id)} className='tw-text-right'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                }

                            </div>
                        ))
                        :
                        <div> No Comments yet !! </div>
                    }
                </Modal.Body>
                <Modal.Footer >
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='tw-p-3 tw-w-full tw-shadow-md' name="" placeholder='Write Here....' id=""></textarea>
                    <button onClick={() => handleAddComment(postsId)} className='btn btn-primary mt-3'>Add</button>
                    <button onClick={handleClose} className='btn btn-danger  mt-3'>Close</button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default PostComments