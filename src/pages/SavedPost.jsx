import React, { useContext, useEffect, useState } from 'react'
import { PostResponseContext } from '../ContextApi/StateContext';
import { allPostAPI } from '../Services/allApi';
import PostCards from '../components/PostCards';
import { Link } from 'react-router-dom';

const SavedPost = () => {
    const { postResponse } = useContext(PostResponseContext)
    const [allPosts, setAllPosts] = useState([])
    const user = JSON.parse(sessionStorage.getItem("user"))
    const userId = user._id
    
    


    useEffect(() => {
        fetchPosts();
    }, [postResponse]);

    const fetchPosts = async () => {
        const searchKey = ""
        try {
            const result = await allPostAPI(searchKey);
            if (result.status === 200) {
                setAllPosts(result.data);
                
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };


    return (
        <div >
            <header className='tw-p-5 tw-mb-2 tw-shadow-md tw-grid tw-grid-cols-3 '>
                <div>

                </div>
                <h2 className='tw-text-center'>Saved Posts
                </h2>
                <div className=' tw-flex tw-justify-end'> <Link to='/userhome' className='btn btn-outline-dark'>Back</Link></div>
            </header>
            <div className='tw-px-10'>
                <div style={{ maxHeight: "85vh" }} className='tw-shadow-md tw-overflow-x-auto tw-grid tw-grid-cols-3'>
                    {allPosts.length > 0 && (
                        allPosts.map((post, index) => {
                            if (post.savedUsers.includes(userId)) {
                                return(<PostCards key={index} values={post} />)
                            }
                        })
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default SavedPost