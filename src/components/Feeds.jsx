import React, { useContext, useEffect, useState } from 'react';
import { ActiveTabContext, StateContext } from '../ContextApi/StateContext';
import Addpost from './Addpost';
import PostCards from './PostCards';
import { allPostAPI } from '../Services/allApi';
import PhotoCards from './PhotoCards';
import VideoCards from './VideoCards';

const Feeds = () => {
    const { sharedState } = useContext(StateContext);
    const { activeTab } = useContext(ActiveTabContext)
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const result = await allPostAPI();
            if (result.status === 200) {
                setAllPosts(result.data);
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
        }

    };

    const mediaTypes = allPosts.length > 0
            ? allPosts.map((post) => {
                return post.media.split('.').pop().toLowerCase(); // Extract file extension
            })
            : []; // Fallback if `allPosts` is empty

        console.log(mediaTypes); // You can use mediaTypes outside the map

    return (
        <div className={sharedState === 'Initial State' ? "tw-flex tw-flex-wrap gap-10 tw-justify-center" : "tw-p-5 tw-flex tw-gap-7 tw-flex-wrap tw-justify-evenly"}>
            {sharedState !== 'Initial State' && <Addpost />}

            {
                allPosts.length > 0 ? (
                    allPosts.map((post, index) => (
                        activeTab === 'all' ?
                            <PostCards key={index} values={post} />
                            :

                            ['mp4', 'mkv'].includes(mediaTypes) && activeTab === 'videos' ?
                                <VideoCards />
                                :[ 'png','jpeg','jpg'].includes(mediaTypes) && activeTab === 'photos' && <PhotoCards />

            ))
            )
            :
            <div> No post yet Added </div>
        }
        </div>
    );
};

export default Feeds;
