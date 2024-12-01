import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from '../ContextApi/StateContext';


const Feeds = () => {

    const { sharedState } = useContext(StateContext);

    return (
        <div className={sharedState === 'Initial State' ? " tw-p-5 tw-flex tw-gap-10 tw-flex-grow tw-flex-wrap tw-justify-center tw-self-auto " : " tw-p-5 tw-flex tw-gap-7 tw-flex-wrap tw-justify-around "} >

            {/* Add new post layout */}

            {
                sharedState != 'Initial State' &&

                <div>
                    <div className="card tw-max-w-xs tw-max-h-fit p-3" >
                        <div className="card-body">

                            <div>
                                <input class="form-control form-control-sm " type="text" placeholder=" Title " id="inputSmall" />

                                <textarea class="form-control my-3" id="exampleTextarea" placeholder=" What's on your mind " rows="3" style={{ height: "83px;" }} ></textarea>

                                <label>
                                    <input type="file" style={{ display: "none" }} />
                                    <span className="btn btn-sm btn-outline-dark"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    </span>

                                    <span className="btn btn-sm mx-3 btn-outline-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>
                                    </span>
                                </label>

                                <span className=' btn btn-sm btn-outline-dark '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                    </svg>
                                </span>
                            </div>



                        </div>
                    </div>
                </div>


            }

            <div className={sharedState === 'Initial State' ? "card tw-max-w-sm tw-max-h-max " : "card tw-max-w-xs tw-max-h-fit "} >
                <div className="card-body">

                    <div className=' d-flex '> <Link><img style={{ width: "40px", height: "40px" }} className=" rounded" src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                        <h5 className=" text-dark m-3 ">UserName</h5>
                    </div>
                    <div className=' tw-my-3 tw-flex tw-flex-col tw-items-center ' >

                        <Link><img className={sharedState === 'Initial State' ? " rounded tw-max-h-72" : "rounded tw-max-h-48 "} src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                    </div>

                    <h6 className=" text-dark my-3 " > Heading </h6>
                    <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eos porro nostrum tempore totam asperiores voluptatum </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>


                </div>
            </div>

            <div className={sharedState === 'Initial State' ? "card tw-max-w-sm tw-max-h-max " : "card tw-max-w-xs tw-max-h-fit "} >
                <div className="card-body">

                    <div className=' d-flex '> <Link><img style={{ width: "40px", height: "40px" }} className=" rounded" src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                        <h5 className=" text-dark m-3 ">UserName</h5>
                    </div>
                    <div className=' tw-my-3 tw-flex tw-flex-col tw-items-center ' >

                        <Link><img className={sharedState === 'Initial State' ? " rounded tw-max-h-72" : "rounded tw-max-h-48 "} src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                    </div>

                    <h6 className=" text-dark my-3 " > Heading </h6>
                    <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eos porro nostrum tempore totam asperiores voluptatum </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>


                </div>
            </div>

            <div className={sharedState === 'Initial State' ? "card tw-max-w-sm tw-max-h-max " : "card tw-max-w-xs tw-max-h-fit "} >
                <div className="card-body">

                    <div className=' d-flex '> <Link><img style={{ width: "40px", height: "40px" }} className=" rounded" src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                        <h5 className=" text-dark m-3 ">UserName</h5>
                    </div>
                    <div className=' tw-my-3 tw-flex tw-flex-col tw-items-center ' >

                        <Link><img className={sharedState === 'Initial State' ? " rounded tw-max-h-72" : "rounded tw-max-h-48 "} src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                    </div>

                    <h6 className=" text-dark my-3 " > Heading </h6>
                    <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eos porro nostrum tempore totam asperiores voluptatum </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>


                </div>
            </div>

            <div className={sharedState === 'Initial State' ? "card tw-max-w-sm tw-max-h-max " : "card tw-max-w-xs tw-max-h-fit "} >
                <div className="card-body">

                    <div className=' d-flex '> <Link><img style={{ width: "40px", height: "40px" }} className=" rounded" src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                        <h5 className=" text-dark m-3 ">UserName</h5>
                    </div>
                    <div className=' tw-my-3 tw-flex tw-flex-col tw-items-center ' >

                        <Link><img className={sharedState === 'Initial State' ? " rounded tw-max-h-72" : "rounded tw-max-h-48 "} src=" https://avatarfiles.alphacoders.com/375/thumb-350-375330.webp" alt="Profilepic" /></Link>
                    </div>

                    <h6 className=" text-dark my-3 " > Heading </h6>
                    <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eos porro nostrum tempore totam asperiores voluptatum </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>


                </div>
            </div>

        </div>
    )
}

export default Feeds