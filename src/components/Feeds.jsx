import React, { useContext, useEffect, useState } from 'react';
import { ActiveTabContext, AddPostResponseContext, EditPostResponseContext, StateContext } from '../ContextApi/StateContext';
import Addpost from './Addpost';
import PostCards from './PostCards';
import { allPostAPI } from '../Services/allApi';
import PhotoCards from './PhotoCards';
import VideoCards from './VideoCards';


const Feeds = () => {
    const {addPostResponse} = useContext(AddPostResponseContext)
    const { editPostResponse } = useContext(EditPostResponseContext);
    const { sharedState } = useContext(StateContext);
    const { activeTab } = useContext(ActiveTabContext);
    const [allPosts, setAllPosts] = useState([]);
    const [mediaTypes, setMediaTypes] = useState([]); // To store media types
    const user = JSON.parse(sessionStorage.getItem("user"))

    useEffect(() => {
        fetchPosts();
    }, [editPostResponse,addPostResponse]);

    const fetchPosts = async () => {
        try {
            const result = await allPostAPI();
            if (result.status === 200) {
                setAllPosts(result.data);
                const types = result.data.map((post) =>
                    post.media.split('.').pop().toLowerCase()
                );
                setMediaTypes(types);
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };

    return (
        <div className={sharedState === 'Initial State' ? "tw-flex tw-flex-wrap gap-10 tw-justify-items-start tw-justify-center " : "tw-p-5 tw-flex tw-gap-7 tw-flex-wrap tw-justify-evenly"}>
            {sharedState !== 'Initial State' && <Addpost />}

            {sharedState === 'Initial State' ?
                allPosts.length > 0 ? (
                    allPosts.map((post, index) => {
                        const mediaType = mediaTypes[index]; // Match media type with the post
                        if (activeTab === 'all') {
                            return <PostCards key={index} values={post} />;
                        } else if (['mp4', 'mkv'].includes(mediaType) && activeTab === 'videos') {
                            return <VideoCards key={index} values={post} />;
                        } else if (['png', 'jpeg', 'jpg'].includes(mediaType) && activeTab === 'photos') {
                            return <PhotoCards key={index} values={post} />;
                        }
                        return null; // No match, render nothing
                    })
                ) : (
                    <div>No posts yet added</div>
                ) :
                allPosts.length > 0 ? (
                    allPosts.map((post, index) => {
                        const mediaType = mediaTypes[index]; // Match media type with the post
                        if (activeTab === 'all' && post.username === user.username) {
                            return <PostCards key={index} values={post} />;
                        } 
                        else if (['mp4', 'mkv'].includes(mediaType) && activeTab === 'videos' && post.username === user.username) {
                            return <VideoCards key={index} values={post} />;
                        } else if (['png', 'jpeg', 'jpg'].includes(mediaType) && activeTab === 'photos' && post.username === user.username) {
                            return <PhotoCards key={index} values={post} />;
                        }
                        return null; // No match, render nothing
                    })
                ) : (
                    <div>No posts yet added</div>
                )

            }
        </div>
    );
};

export default Feeds;
