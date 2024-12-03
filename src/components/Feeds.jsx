import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from '../ContextApi/StateContext';
import Addpost from './Addpost';
import PostCards from './PostCards';

const Feeds = () => {

    const { sharedState } = useContext(StateContext);

    return (

        <div className={sharedState === 'Initial State' ? " tw-p-5 tw-flex tw-gap-10 tw-flex-grow tw-flex-wrap tw-justify-center tw-self-auto " : " tw-p-5 tw-flex tw-gap-7 tw-flex-wrap tw-justify-around "} >

            {
                sharedState != 'Initial State' &&
                <Addpost/>
            }
           <PostCards/>
           <PostCards/>
           <PostCards/>
           <PostCards/>
           <PostCards/>

        </div>
    )
}

export default Feeds