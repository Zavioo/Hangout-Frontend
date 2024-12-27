import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../ContextApi/StateContext';
import { Modal, Button } from 'react-bootstrap';
import SERVER_URL from '../Services/serverURL';
import EditPost from './EditPost';


const PostCards = ({ values }) => {
    const [show, setShow] = useState(false);
    const { sharedState } = useContext(StateContext);
    const [value,setValue] = useState(false);

    const profilePic = values.userId?.profilePic || 'user.jpg'

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const mediaType = values.media.split('.').pop().toLowerCase(); //To Get file extension


    return (
        <div className={sharedState === 'Initial State' ? "card tw-max-w-sm tw-max-h-max tw-mx-5 tw-mb-5" : "card tw-max-w-xs tw-max-h-fit"}>
            <div className="card-body">
                <div className="d-flex">
                    <Link>
                        <img
                            style={{ width: "40px", height: "40px" }}
                            className="rounded"
                            src={`${SERVER_URL}/uploads/${profilePic}`}
                            alt="Profilepic"
                        />
                    </Link>
                    <h5 className="text-dark m-3">{values.username}</h5>
                </div>

                <div className="tw-my-3 tw-flex tw-flex-col tw-items-center">
                    {['mp4', 'mkv'].includes(mediaType) ? (
                        <video
                            controls
                            className={sharedState === 'Initial State' ? "rounded tw-max-h-72" : "rounded tw-max-h-48"}
                            src={`${SERVER_URL}/uploads/${values.media}`}
                        ></video>
                    ) : (
                        <img
                            className={sharedState === 'Initial State' ? "rounded tw-max-h-72" : "rounded tw-max-h-48"}
                            src={`${SERVER_URL}/uploads/${values.media}`}
                            alt="Media"
                        />
                    )}
                </div>

                <h6 className="text-dark my-3">{values.title}</h6>
                <p>
                    {values.description}
                    {sharedState === 'Initial State' &&
                        <Link onClick={handleShow}>Read More</Link>}
                </p>

                {sharedState !== 'Initial State' && (
                    <div>
                        {/* Edit Post button */}
                        <EditPost post={values}/>
                        {/* Post Delete Button */}
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Post Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{values.title}</h5>
                    <p>{values.description}</p>
                    {['mp4', 'mkv'].includes(mediaType) ? (
                        <video controls src={`${SERVER_URL}/uploads/${values.media}`} style={{ width: '100%' }}></video>
                    ) : (
                        <img src={`${SERVER_URL}/uploads/${values.media}`} alt="Media" style={{ width: '100%' }} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PostCards;
