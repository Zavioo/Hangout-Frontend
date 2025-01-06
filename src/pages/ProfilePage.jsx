import React, { useContext, useEffect } from 'react'
import { PostResponseContext } from '../ContextApi/StateContext';
import SERVER_URL from '../Services/serverURL';
import { Link } from 'react-router-dom';
import { getUserPostsAPI } from '../Services/allApi';


const ProfilePage = () => {
    const { postResponse, setPostResponse } = useContext(PostResponseContext);
    const profilePic = postResponse.profilePic && postResponse.profilePic || 'user.jpg'
    console.log(postResponse);
    const userId = postResponse._id
    console.log("First" ,userId);
    

    useEffect(() => {
        setTimeout(() => {
            handleGetUserPosts(userId)
            alert('Api Call')
        }, 2000);
        
    }, [])

    const handleGetUserPosts = async (id) => {
        try {
            const result = await getUserPostsAPI(id);
            if (result.status === 200) {

                // console.log(result.data);

                // const types = result.data.map((post) =>
                //     post.media.split('.').pop().toLowerCase()
                // );

            }
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };



    return (
        <div className='tw-p-40 tw-rounded-md '>

            <div className='tw-flex'>
                <img className='tw-size-80 tw-rounded-3xl tw-mr-6' src={`${SERVER_URL}/uploads/${profilePic}`}
                    alt="Profilepic" />
                <div className='tw-pt-10 tw-pl-3 '>
                    <h2>{postResponse.name}</h2>
                    <h5 className='tw-pl-3'>{postResponse.username}</h5>
                    <p className='tw-pl-4'>{postResponse.about}</p>
                </div>
            </div>
            <div className='tw-flex tw-justify-center tw-mt-14'>
                <div className='layout'>
                    <button>
                        <img src='' alt='img' />

                    </button>
                </div>

            </div>


        </div>
    )
}

export default ProfilePage