import React, { useEffect } from 'react'
import { getSavedPostAPI } from '../Services/allApi'

const SavedPost = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const id = user._id

    useEffect(() => {
        handleGetSavedPosts()
    }, [])


    const handleGetSavedPosts = async () => {
        try {
            const result = await getSavedPostAPI(id)
            
            if (result.status == 200) {
                console.log(result.data);

            }
        } catch (err) {
            console.error('Error Getting Saved Posts', err);
        }


    }

    return (
        <div>SavedPost</div>
    )
}

export default SavedPost