import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../ContextApi/StateContext';
import Addpost from './Addpost';
import PostCards from './PostCards';
import { allPostAPI } from '../Services/allApi';

const Feeds = () => {
    const { sharedState } = useContext(StateContext);
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

    return (
        <div className={sharedState === 'Initial State' ? "tw-flex tw-flex-wrap gap-10 tw-justify-center" : "tw-p-5 tw-flex tw-gap-7 tw-flex-wrap tw-justify-evenly"}>
            {sharedState !== 'Initial State' && <Addpost />}
            {allPosts.length > 0 ? (
                allPosts.map((post, index) => (
                    <PostCards key={index} values={post} />
                ))
            ) : (
                <div>No posts yet added</div>
            )}
        </div>
    );
};

export default Feeds;
