import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../ContextApi/StateContext';
import { Modal, Button } from 'react-bootstrap';
import SERVER_URL from '../Services/serverURL';
import EditPost from './EditPost';
import RemovePost from './RemovePost';


const PostCards = ({ values }) => {
    const [show, setShow] = useState(false);
    const { sharedState } = useContext(StateContext);


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
                       <RemovePost post={values}/>
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
