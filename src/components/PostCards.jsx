import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../ContextApi/StateContext';
import { Modal, Button } from 'react-bootstrap';
import SERVER_URL from '../Services/serverURL';

const PostCards = ({ values }) => {
    const [show, setShow] = useState(false);
    const { sharedState } = useContext(StateContext);

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
                            src={`${SERVER_URL}/uploads/${values.profileImg}`}
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
                    {values.description}{' '}
                    {sharedState === 'Initial State' && <Link onClick={handleShow}>Read More</Link>}
                </p>

                {sharedState !== 'Initial State' && (
                    <div>
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
