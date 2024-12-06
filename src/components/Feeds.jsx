import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ActiveTabContext, StateContext } from '../ContextApi/StateContext';
import Addpost from './Addpost';
import PostCards from './PostCards';
import PhotoCards from './PhotoCards';
import VideoCards from './VideoCards';

const Feeds = () => {

    const { sharedState } = useContext(StateContext);
    const { activeTab } = useContext(ActiveTabContext)
    console.log(sharedState);
    
    return (

        <div className={sharedState === 'Initial State' ? 
        " tw-flex tw-flex-wrap gap-10 tw-justify-center " 
        : 
        " tw-p-5 tw-flex tw-gap-7 tw-flex-wrap tw-justify-evenly "} >
        

            {
                sharedState != 'Initial State' &&
                <Addpost />
            }
            {activeTab === 'all' ?
                <PostCards /> : activeTab === 'photos' ?
                    <PhotoCards /> : activeTab === 'videos' &&
                    <VideoCards />

            }

        
         </div>
    )
}

export default Feeds