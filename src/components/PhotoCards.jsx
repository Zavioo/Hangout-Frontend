import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'



const PhotoCards = () => {
    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    
    const handleClose = () => setShow(false)

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    return (
        <>
           

            {values.map((v, idx) => (
                <Button key={idx} className=" tw-mx-7 tw-mb-7 btn btn-light" onClick={() => handleShow(v)}>
                     <img className="rounded" src="https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="pics" />
                    {typeof v === 'string' && `below ${v.split('-')[0]}`}
                </Button>
            ))}

            <Modal show={show} onHide={handleClose} fullscreen={fullscreen} >
                <Modal.Header closeButton>
                    <Modal.Title>  </Modal.Title>
                </Modal.Header>
                <Modal.Body className='tw-flex tw-justify-center' >
                    <img className="" src="https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="pics" />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PhotoCards