import React, { useState } from 'react'
import vid1 from '../assets/videos/vid1.mp4'
import vid2 from '../assets/videos/vid2.mp4'
import { Button, Modal } from 'react-bootstrap'

const VideoCards = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <div className='tw-mx-7 tw-mb-7 hover:tw-'>
      <Button onClick={handleShow} className='btn btn-light'>
        <video width="450" >
          <source src={vid1} type="video/mp4" />
          Your browser does not support videos
        </video>
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video controls autoPlay >
            <source src={vid1} type="video/mp4" />
            Your browser does not support videos
          </video>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default VideoCards