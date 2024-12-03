import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from '../ContextApi/StateContext'


const PostCards = () => {

    const { sharedState } = useContext(StateContext);

    return (
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

                {sharedState !== 'Initial State' ?
                    <button className='mx-3'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6 tw-text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    </button>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>}
            </div>
        </div>
    )
}

export default PostCards