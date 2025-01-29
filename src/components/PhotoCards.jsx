import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import SERVER_URL from '../Services/serverURL';
import { StateContext } from '../ContextApi/StateContext';



const PhotoCards = ({ values }) => {
    const value = [true];
    const [show, setShow] = useState(false)
    const { sharedState } = useContext(StateContext);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    return (
        <div className={sharedState === 'Initial State' ? " tw-max-w-sm tw-max-h-max tw-mx-5 tw-mb-5 tw-mt-20" : " tw-max-w-xs tw-max-h-fit"} >
            {value.map((v, idx) => (
                <Button key={idx} className=" tw-mx-7 tw-mb-7 btn btn-light" onClick={handleShow}>
                    <img className="rounded" src={`${SERVER_URL}/uploads/${values.media}`} alt="pics" />
                </Button>
            ))}
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>  </Modal.Title>
                </Modal.Header>
                <Modal.Body className='tw-flex tw-justify-center' >
                    <img src={`${SERVER_URL}/uploads/${values.media}`} alt="pics" />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PhotoCards