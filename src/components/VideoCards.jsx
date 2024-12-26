import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { StateContext } from '../ContextApi/StateContext'
import SERVER_URL from '../Services/serverURL'


const VideoCards = ({values}) => {
  const [show, setShow] = useState(false);
  const { sharedState } = useContext(StateContext);


  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <div div className={sharedState === 'Initial State' ? " tw-max-w-sm tw-max-h-max tw-mx-5 tw-mb-5" : " tw-max-w-xs tw-max-h-fit"}>
      <Button onClick={handleShow} className='btn btn-light'>
        <video width="450" >
          <source src={`${SERVER_URL}/uploads/${values.media}`} type="video/mp4" />
          Your browser does not support videos
        </video>
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video controls autoPlay >
            <source src={`${SERVER_URL}/uploads/${values.media}`} type="video/mp4" />
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