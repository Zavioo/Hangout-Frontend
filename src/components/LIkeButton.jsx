import React, { useContext } from 'react';
import { PostResponseContext } from '../ContextApi/StateContext';
// import { likePostAPI } from '../Services/allApi'; // Create this API function

const LikeButton = ({ postId }) => {
    // const { setPostResponse } = useContext(PostResponseContext);

    // const handleLike = async () => {
    //     try {
    //         const result = await likePostAPI(postId); // Call the like API
    //         if (result.status === 200) {
    //             setPostResponse(result.data); // Update the context with the new like data
    //         }
    //     } catch (error) {
    //         console.error('Error liking the post:', error);
    //     }
    // };

    return (
        <button className="tw-flex tw-items-center tw-justify-center tw-p-1  tw-text-slate-600 hover:tw-text-white   tw-rounded-lg tw-transition tw-duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fef2f2" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

        </button>
    );
};

export default LikeButton;