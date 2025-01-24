import React, { useContext, useEffect, useState } from 'react'
import { updateSavedPostAPI } from '../Services/allApi';
import { PostResponseContext } from '../ContextApi/StateContext';

const SavePostBtn = ({ postId, savedUsers}) => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    // console.log(`Post Id : ${postId} User : ${user._id}`);
    const { setPostResponse } = useContext(PostResponseContext);
    const [color, setColor] = useState()
    console.log(savedUsers);
    

    const handleUpdateSavedPost = async () => {
        const id = postId
        const userId = user._id
        const reqBody = { userId }

        try {
            console.log(id , reqBody);
            
            const result = await updateSavedPostAPI(id, reqBody)
            if (result.status == 200) {
                console.log(result.data);
                // sessionStorage.setItem("user", JSON.stringify(result.data))
                setPostResponse(result.data)
            }
        } catch (err) {
            console.error('Error Updating Saved Posts', err);
        }
    }

    useEffect(() => {
        const userID = user._id
        setColor(savedUsers.includes(userID) ? "#14b8a6" : "none")
        console.log(`User Id : ${userID}`);
        
    }, [handleUpdateSavedPost])

    return (
        <>
            <button onClick={handleUpdateSavedPost} className='tw-p-1 tw-text-black hover:tw-text-teal-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
            </button>
        </>
    )
}

export default SavePostBtn