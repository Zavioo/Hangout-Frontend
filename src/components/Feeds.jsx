import React, { useContext, useEffect, useState } from 'react'
import { ActiveTabContext, AllPosts, StateContext } from '../ContextApi/StateContext';
import Addpost from './Addpost';
import PostCards from './PostCards';
import PhotoCards from './PhotoCards';
import VideoCards from './VideoCards';
import { allPostAPI } from '../Services/allApi'


const Feeds = () => {
    const { sharedState } = useContext(StateContext);
    const { activeTab } = useContext(ActiveTabContext)
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        addPost()
    }, [])

    const addPost = async () => {
        try {
            const result = await allPostAPI()
            // console.log(result);
            if (result.status == 200) {
                setAllPosts(result.data)
            }

        } catch (err) {
            console.log((err));
        }
    }
    console.log(allPosts);

    return (

        <div className={sharedState === 'Initial State' ?
            " tw-flex tw-flex-wrap gap-10 tw-justify-center "
            :
            " tw-p-5 tw-flex tw-gap-7 tw-flex-wrap tw-justify-evenly "} >


            {
                sharedState != 'Initial State' &&
                <Addpost />
            }

            {
                allPosts?.length > 0 ?
                    allPosts?.map(post => (
                        activeTab === 'all' ?
                            <PostCards values={post} />
                            
                            : activeTab === 'photos' ?
                                <PhotoCards /> : activeTab === 'videos' &&
                                <VideoCards />
                    ))
                    :
                    <div> No post yet Added </div>
            }
        </div>
    )
}

export default Feeds