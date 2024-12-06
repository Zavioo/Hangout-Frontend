import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from '../ContextApi/StateContext'
import { Button, Modal } from 'react-bootstrap'


const PostCards = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const { sharedState } = useContext(StateContext);

    return (
        <div className={sharedState === 'Initial State' ? "card tw-max-w-sm tw-max-h-max tw-m-5 " : "card tw-max-w-xs tw-max-h-fit "} >
            <div className="card-body">

                <div className=' d-flex '> <Link><img style={{ width: "40px", height: "40px" }} className=" rounded" src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                    <h5 className=" text-dark m-3 ">UserName</h5>
                </div>
                <div className=' tw-my-3 tw-flex tw-flex-col tw-items-center ' >

                    <Link><img className={sharedState === 'Initial State' ? " rounded tw-max-h-72" : "rounded tw-max-h-48 "} src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>

                </div>

                <h6 className=" text-dark my-3 " > Heading </h6>
                <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eos porro nostrum tempore totam asperiores voluptatum... {sharedState === 'Initial State' && <Link onClick={handleShow} className=''>
                    Read More</Link>}</p>

                {sharedState !== 'Initial State' ?
                   <div>
                        <button onClick={handleShow} className='mx-3'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6 tw-text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        </button>
                        <button >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                   </div>
                  
                    :

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                }
                {/* Like Button */}
            </div>
            <Modal show={show} onHide={handleClose} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title>  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {sharedState === 'Initial State' ? <div className="card-body">
                        <div className=' d-flex '> <Link><img style={{ width: "40px", height: "40px" }} className=" rounded" src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                            <h5 className=" text-dark m-3 ">UserName</h5>
                        </div>
                        <div className=' tw-my-3 tw-flex tw-flex-col tw-items-center ' >
                            <Link><img className={sharedState === 'Initial State' ? " rounded tw-max-h-72" : "rounded tw-max-h-48 "} src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                        </div>

                        <h6 className=" text-dark my-3 " > Heading </h6>
                        <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eos porro nostrum tempore totam asperiores voluptatum...  </p>
                    </div>
                        :
                        <div className=' tw-flex tw-flex-col tw-items-center '>
                            <input class="form-control form-control-sm " type="text" placeholder=" Title " id="inputSmall" />

                            <textarea class="form-control my-3" id="exampleTextarea" placeholder=" What's on your mind " rows="3" style={{ height: "200px;" }} ></textarea>

                            <label>
                                <input type="file" style={{ display: "none" }} />
                                <img src="https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="" />
                            </label>
                        </div>
                    }
                </Modal.Body>
                {sharedState === "Updated State" && <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Share
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>}
            </Modal>
        </div>
    )
}

export default PostCards