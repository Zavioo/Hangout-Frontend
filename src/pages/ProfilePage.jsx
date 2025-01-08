import React, { useContext, useEffect, useState } from 'react'
import { PostResponseContext } from '../ContextApi/StateContext';
import SERVER_URL from '../Services/serverURL';
import { Link } from 'react-router-dom';
import { getUserPostsAPI, updateFriendsAPI } from '../Services/allApi';
import { Button } from 'react-bootstrap';


const ProfilePage = () => {
    const { postResponse, setPostResponse } = useContext(PostResponseContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [postDetails, setPostDetails] = useState([])
    const [changeButton, setChangeButton] = useState()
    const [friends, setFriends] = useState([])
    const profilePic = postResponse.profilePic && postResponse.profilePic || 'user.jpg'
    const userId = postResponse._id



    useEffect(() => {
        handleGetUserPosts(userId)
    }, [])

    const handleGetUserPosts = async (id) => {
        try {
            const result = await getUserPostsAPI(id);
            if (result.status === 200) {

                console.log(result.data);
                setPostDetails(result.data)
                const type = result.data.media.split('.').pop().toLowerCase();
                setMediaType(type)
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };


    const handleUpdateFriends = async () => {


        const token = sessionStorage.getItem("token")

        if (token) {

            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const id = user._id // current users id
            const reqBody = { userId } //userId to be added
            console.log("New", id, reqBody);

            try {
                const result = await updateFriendsAPI(id, reqBody, reqHeader);
                if (result.status === 200) {
                    setFriends(result.data)
                    sessionStorage.setItem("user", JSON.stringify(result.data))
                    console.log(result.data);

                }
            } catch (error) {
                console.error('Error liking the post:', error);
            }
        }
    }

    useEffect(() => {
        setChangeButton(user.friends.includes(userId) ? true : false)
    }, [handleUpdateFriends])

    return (
        <>
            <div className='tw-px-40  tw-py-24 tw-rounded-md '>
                <div className='tw-flex tw-justify-end'>
                    <Link className='btn btn-outline-dark' to='/userhome'>Back</Link>
                </div>
                <div className='tw-flex tw-justify-center tw-w-full'>
                    <div className='tw-flex tw-w-full'>

                        <img className='tw-size-80 tw-rounded-3xl tw-mr-6 ' src={`${SERVER_URL}/uploads/${profilePic}`}
                            alt="Profilepic" />
                        <div className='tw-pt-10 tw-pl-3 tw-w-1/2 '>
                            <h2>{postResponse.name}</h2>
                            <h5 className='tw-pl-3'>{postResponse.username}</h5>
                            <p className='tw-pl-4'>{postResponse.about}</p>
                            {userId !== user._id &&
                                <div>
                                    {
                                        changeButton ?

                                            <button onClick={handleUpdateFriends} type="button" className='tw-mt-2 btn btn-outline-info '>Friends</button>
                                            :
                                            <button onClick={handleUpdateFriends} type="button" className='tw-mt-2 btn btn-info '>Add to Friends</button>

                                    }
                                </div>
                            }
                        </div>
                    </div>

                </div >

                <h2 className='tw-mt-20 tw-border-b-2 tw-pb-5 tw-text-center'>Posts</h2>
                <div className='tw-flex tw-justify-center tw-mt-10'>
                    <div className='layout'>
                        {
                            postDetails.length !== 0 ? (
                                postDetails.map(post => {
                                    // Determine media type based on the file extension
                                    const mediaType = post.media.split('.').pop().toLowerCase();
                                    return (
                                        <div className='items' key={post._id}>
                                            {['mp4', 'mkv'].includes(mediaType) ? (
                                                <video
                                                    src={`${SERVER_URL}/uploads/${post.media}`}
                                                    controls // Add controls for video playback
                                                    style={{ width: '100%', height: 'auto' }} // Optional styling
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <img
                                                    src={`${SERVER_URL}/uploads/${post.media}`}
                                                    alt="Media"
                                                    style={{ width: '100%', height: 'auto' }} // Optional styling
                                                />
                                            )}
                                        </div>
                                    );
                                })
                            ) :
                                <div>No Post yet !!</div>
                        }
                    </div>
                </div>
            </div>
        </ >
    )
}

export default ProfilePage